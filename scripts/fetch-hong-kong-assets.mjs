import { execFile } from 'node:child_process';
import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const rootDir = resolve(import.meta.dirname, '..');
const assetsDir = resolve(rootDir, 'public', 'travel-assets');
const workDir = await mkdtemp(resolve(tmpdir(), 'cinna-travel-hk-'));

const searches = [
  ['hong-kong-peak', 'Victoria Peak Hong Kong skyline'],
  ['victoria-harbour', 'Victoria Harbour Hong Kong skyline'],
  ['avenue-of-stars', 'Avenue of Stars Hong Kong'],
  ['star-ferry', 'Celestial Star Ferry Hong Kong'],
  ['mid-levels-escalator', 'Central Mid-Levels Escalator Hong Kong'],
  ['wong-tai-sin-temple', 'Wong Tai Sin Temple Hong Kong'],
  ['repulse-bay', 'Repulse Bay Hong Kong beach'],
  ['west-kowloon', 'West Kowloon Cultural District Hong Kong'],
  ['tian-tan-buddha', 'Tian Tan Buddha Lantau Hong Kong'],
  ['tai-o', 'Tai O fishing village Hong Kong'],
  ['dragons-back', "Dragon's Back Hong Kong trail"],
  ['sai-kung-geopark', 'High Island Reservoir East Dam Hong Kong Geopark'],
  ['cheung-chau', 'Cheung Chau island Hong Kong'],
  ['temple-street', 'Temple Street Night Market Hong Kong'],
  ['nan-lian-garden', 'Chi Lin Nunnery Nan Lian Garden Hong Kong architecture'],
];

function plainText(value = '') {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function commonsPageUrl(title) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replaceAll(' ', '_')).replaceAll('%3A', ':')}`;
}

async function fetchWithRetry(url, attempts = 5) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'CinnaTravel/1.0 (github.com/icelemon233/cinna-travel)' } });
      if (response.ok) return response;
      lastError = new Error(`Request failed with ${response.status}: ${url}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts) await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 1200));
  }
  throw lastError;
}

async function searchCommons(query) {
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrsearch: query, gsrnamespace: '6', gsrlimit: '12',
    prop: 'imageinfo', iiprop: 'url|size|mime|extmetadata', iiurlwidth: '1200',
  });
  const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {})
    .sort((first, second) => first.index - second.index)
    .map((page) => ({ page, info: page.imageinfo?.[0] }))
    .filter(({ info }) => info?.thumburl && ['image/jpeg', 'image/png', 'image/webp'].includes(info.mime))
    .filter(({ info }) => info.width >= 1000 && info.height >= 650)
    .sort((first, second) => {
      const firstLandscape = first.info.width / first.info.height >= 1.2 ? 1 : 0;
      const secondLandscape = second.info.width / second.info.height >= 1.2 ? 1 : 0;
      return secondLandscape - firstLandscape || first.page.index - second.page.index;
    });
}

await mkdir(assetsDir, { recursive: true });
const usedTitles = new Set();
const output = {};

try {
  const requestedSpotId = process.env.HK_SPOT_ID;
  const selectedSearches = requestedSpotId ? searches.filter(([spotId]) => spotId === requestedSpotId) : searches;
  if (!selectedSearches.length) throw new Error(`Unknown HK_SPOT_ID: ${requestedSpotId}`);
  for (const [spotId, query] of selectedSearches) {
    const candidates = await searchCommons(query);
    output[spotId] = [];

    for (const { page, info } of candidates.filter(({ page }) => !usedTitles.has(page.title))) {
      if (output[spotId].length === 2) break;
      const imageIndex = output[spotId].length;
      const extension = basename(new URL(info.thumburl).pathname).split('.').at(-1) || 'jpg';
      const tempFile = resolve(workDir, `${spotId}-${imageIndex + 1}.${extension}`);
      const filename = `hk-${spotId}-${imageIndex + 1}.webp`;
      const targetFile = resolve(assetsDir, filename);
      let targetExists = true;
      try { await access(targetFile); } catch { targetExists = false; }
      if (!targetExists) {
        try {
          const proxySource = info.thumburl.replace(/^https?:\/\//, '');
          const proxyUrl = `https://wsrv.nl/?url=${proxySource}&w=1000&output=jpg`;
          const imageResponse = await fetchWithRetry(proxyUrl, 2);
          await writeFile(tempFile, Buffer.from(await imageResponse.arrayBuffer()));
          await execFileAsync('magick', [
            tempFile, '-auto-orient', '-strip', '-resize', '1200x1200>',
            '-quality', '78', '-define', 'webp:method=6', targetFile,
          ]);
        } catch (error) {
          process.stderr.write(`Skipped ${page.title}: ${error.message}\n`);
          continue;
        }
      }

      usedTitles.add(page.title);
      const metadata = info.extmetadata || {};
      output[spotId].push({
        dataUrl: `./travel-assets/${filename}`,
        pageUrl: commonsPageUrl(page.title),
        artist: plainText(metadata.Artist?.value) || 'Wikimedia Commons contributor',
        license: plainText(metadata.LicenseShortName?.value) || 'See source page',
        sourceTitle: page.title,
      });
    }
    if (output[spotId].length === 1) {
      const firstImage = output[spotId][0];
      const firstFile = resolve(assetsDir, firstImage.dataUrl.split('/').at(-1));
      const secondFile = resolve(assetsDir, `hk-${spotId}-2.webp`);
      await execFileAsync('magick', [
        firstFile, '-resize', '1100x825^', '-gravity', 'east', '-crop', '900x675+0+0', '+repage',
        '-quality', '78', '-define', 'webp:method=6', secondFile,
      ]);
      output[spotId].push({
        ...firstImage,
        dataUrl: `./travel-assets/hk-${spotId}-2.webp`,
        sourceTitle: `${firstImage.sourceTitle} (detail crop)`,
      });
      process.stderr.write(`Created a second editorial crop for ${spotId} from its licensed source image.\n`);
    }
    if (output[spotId].length === 0) throw new Error(`No usable Commons images found for ${spotId}`);
    process.stderr.write(`Downloaded ${spotId}: ${output[spotId].map((image) => image.sourceTitle).join(' | ')}\n`);
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 700));
  }
  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
} finally {
  await rm(workDir, { recursive: true, force: true });
}
