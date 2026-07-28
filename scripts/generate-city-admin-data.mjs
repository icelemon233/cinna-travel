import { mkdir, writeFile } from 'node:fs/promises';

const sources = {
  sichuan: 'https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json',
  tibet: 'https://geo.datav.aliyun.com/areas_v3/bound/540000_full.json',
  hongkong: 'https://geo.datav.aliyun.com/areas_v3/bound/810000_full.json',
};

const capitals = new Set(['510100', '540100', '810001']);
const tolerance = 0.015;

function squaredSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;
  if (dx || dy) {
    const ratio = ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy);
    if (ratio > 1) {
      x = end[0];
      y = end[1];
    } else if (ratio > 0) {
      x += dx * ratio;
      y += dy * ratio;
    }
  }
  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyStep(points, first, last, squaredTolerance, markers) {
  let maximum = squaredTolerance;
  let index = 0;
  for (let cursor = first + 1; cursor < last; cursor += 1) {
    const distance = squaredSegmentDistance(points[cursor], points[first], points[last]);
    if (distance > maximum) {
      maximum = distance;
      index = cursor;
    }
  }
  if (maximum <= squaredTolerance) return;
  if (index - first > 1) simplifyStep(points, first, index, squaredTolerance, markers);
  markers[index] = 1;
  if (last - index > 1) simplifyStep(points, index, last, squaredTolerance, markers);
}

function simplifyRing(ring) {
  if (ring.length <= 5) return ring;
  const line = ring.slice(0, -1);
  const markers = new Uint8Array(line.length);
  markers[0] = 1;
  markers[line.length - 1] = 1;
  simplifyStep(line, 0, line.length - 1, tolerance * tolerance, markers);
  const simplified = line.filter((_, index) => markers[index]);
  if (simplified.length < 3) return ring;
  simplified.push(simplified[0]);
  return simplified;
}

function simplifyCoordinates(value) {
  if (Array.isArray(value) && typeof value[0]?.[0] === 'number') return simplifyRing(value);
  return value.map(simplifyCoordinates);
}

function shortCityName(name) {
  return name
    .replace('藏族羌族自治州', '')
    .replace('藏族自治州', '')
    .replace('彝族自治州', '')
    .replace(/市$|地区$|区$/u, '');
}

const cityAdminData = {};
for (const [province, url] of Object.entries(sources)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to download ${url}: ${response.status}`);
  const collection = await response.json();
  cityAdminData[province] = {
    regions: collection.features.map((feature) => ({
      id: String(feature.properties.adcode),
      name: feature.properties.name,
      geometry: {
        type: feature.geometry.type,
        coordinates: simplifyCoordinates(feature.geometry.coordinates),
      },
    })),
    cities: collection.features.map((feature) => ({
      id: String(feature.properties.adcode),
      name: feature.properties.name,
      shortName: shortCityName(feature.properties.name),
      coordinate: feature.properties.center,
      capital: capitals.has(String(feature.properties.adcode)),
    })),
  };
}

await mkdir(new URL('../src/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../src/city-admin-data.js', import.meta.url),
  `// Generated from DataV administrative boundary data by scripts/generate-city-admin-data.mjs.\nexport const cityAdminData = ${JSON.stringify(cityAdminData)};\n`,
);

console.log(`Generated ${Object.values(cityAdminData).reduce((sum, province) => sum + province.cities.length, 0)} city records.`);
