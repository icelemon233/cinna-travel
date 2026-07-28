import { mkdir, writeFile } from 'node:fs/promises';

const bounds = [91.02, 29.61, 91.17, 29.73];
const tiles = [
  [29.61, 91.02, 29.67, 91.095],
  [29.61, 91.095, 29.67, 91.17],
  [29.67, 91.02, 29.73, 91.095],
  [29.67, 91.095, 29.73, 91.17],
];
const endpoints = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass-api.de/api/interpreter',
];
const highwayPattern = '^(motorway|trunk|primary|secondary|tertiary|residential|living_street|unclassified)$';
const userAgent = 'cinna-travel-map-data/1.0 (github.com/icelemon233/cinna-travel)';

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

function simplifyLine(points, tolerance) {
  if (points.length <= 2) return points;
  const markers = new Uint8Array(points.length);
  markers[0] = 1;
  markers[points.length - 1] = 1;
  simplifyStep(points, 0, points.length - 1, tolerance * tolerance, markers);
  return points.filter((_, index) => markers[index]);
}

function roadClass(highway) {
  if (['motorway', 'trunk', 'primary'].includes(highway)) return 'arterial';
  if (['secondary', 'tertiary'].includes(highway)) return 'collector';
  return 'local';
}

function normalizeRoadName(value) {
  if (!value) return '';
  const firstHanCharacter = value.search(/\p{Script=Han}/u);
  return firstHanCharacter > 0 ? value.slice(firstHanCharacter).trim() : value.trim();
}

function lineLength(points) {
  return points.slice(1).reduce((sum, point, index) => {
    const previous = points[index];
    const latitudeScale = Math.cos(((point[1] + previous[1]) / 2) * Math.PI / 180);
    return sum + Math.hypot((point[0] - previous[0]) * latitudeScale, point[1] - previous[1]);
  }, 0);
}

function labelPoint(points) {
  const lengths = points.slice(1).map((point, index) => lineLength([points[index], point]));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let traversed = 0;
  for (let index = 0; index < lengths.length; index += 1) {
    if (traversed + lengths[index] >= total / 2) {
      const ratio = lengths[index] ? (total / 2 - traversed) / lengths[index] : 0;
      return {
        coordinate: [
          points[index][0] + (points[index + 1][0] - points[index][0]) * ratio,
          points[index][1] + (points[index + 1][1] - points[index][1]) * ratio,
        ],
        segment: [points[index], points[index + 1]],
      };
    }
    traversed += lengths[index];
  }
  return { coordinate: points[Math.floor(points.length / 2)], segment: points.slice(-2) };
}

async function queryTile(bbox, tileIndex) {
  const query = `[out:json][timeout:60];way["highway"~"${highwayPattern}"](${bbox.join(',')});out tags geom;`;
  let lastError;
  for (let attempt = 0; attempt < endpoints.length; attempt += 1) {
    const endpoint = endpoints[(tileIndex + attempt) % endpoints.length];
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': userAgent },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(75_000),
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return (await response.json()).elements;
    } catch (error) {
      lastError = new Error(`${endpoint}: ${error.message}`);
    }
  }
  throw lastError;
}

const waysById = new Map();
for (let index = 0; index < tiles.length; index += 1) {
  const elements = await queryTile(tiles[index], index);
  elements.forEach((element) => waysById.set(element.id, element));
  console.log(`Downloaded Lhasa street tile ${index + 1}/${tiles.length}.`);
}

const roads = { arterial: [], collector: [], local: [] };
const names = new Map();
for (const way of waysById.values()) {
  if (!way.geometry || way.geometry.length < 2) continue;
  const kind = roadClass(way.tags.highway);
  const tolerance = kind === 'arterial' ? 0.000015 : kind === 'collector' ? 0.000025 : 0.00004;
  const points = simplifyLine(way.geometry.map(({ lon, lat }) => [lon, lat]), tolerance)
    .map(([longitude, latitude]) => [Number(longitude.toFixed(6)), Number(latitude.toFixed(6))]);
  roads[kind].push(points);

  const name = normalizeRoadName(way.tags['name:zh'] || way.tags.name);
  if (!name || kind === 'local') continue;
  const length = lineLength(points);
  const current = names.get(name) || { name, kind, length: 0, longestLength: 0, points };
  current.length += length;
  if (length > current.longestLength) {
    current.longestLength = length;
    current.points = points;
  }
  if (kind === 'arterial') current.kind = kind;
  names.set(name, current);
}

const labels = [...names.values()]
  .filter(({ name }) => /[\p{Script=Han}A-Za-z0-9]/u.test(name))
  .sort((first, second) => {
    const rank = { arterial: 0, collector: 1 };
    return rank[first.kind] - rank[second.kind] || second.length - first.length;
  })
  .slice(0, 16)
  .map(({ name, kind, points }) => ({ name, kind, ...labelPoint(points) }));

const lhasaStreetData = {
  bounds,
  source: 'OpenStreetMap contributors via Overpass API',
  roadCount: Object.values(roads).reduce((sum, group) => sum + group.length, 0),
  roads,
  labels,
};

await mkdir(new URL('../src/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../src/lhasa-street-data.js', import.meta.url),
  `// Generated from OpenStreetMap data by scripts/generate-lhasa-street-data.mjs.\nexport const lhasaStreetData = ${JSON.stringify(lhasaStreetData)};\n`,
);

console.log(`Generated ${lhasaStreetData.roadCount} Lhasa street segments and ${labels.length} labels.`);
