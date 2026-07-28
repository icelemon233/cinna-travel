import { execFile } from 'node:child_process';
import { mkdir, readdir, stat, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const rootDir = resolve(import.meta.dirname, '..');
const assetsDir = resolve(rootDir, 'public', 'travel-assets');
const thumbnailsDir = resolve(assetsDir, 'thumbs');
const thumbnailWidth = 560;
const thumbnailQuality = 64;
const batchSize = 8;

await mkdir(thumbnailsDir, { recursive: true });

const sourceFiles = (await readdir(assetsDir))
  .filter((filename) => filename.endsWith('.webp'))
  .sort();
const sourceFileSet = new Set(sourceFiles);
const staleThumbnails = (await readdir(thumbnailsDir)).filter(
  (filename) => filename.endsWith('.webp') && !sourceFileSet.has(filename),
);

await Promise.all(staleThumbnails.map((filename) => unlink(resolve(thumbnailsDir, filename))));

async function generateThumbnail(filename) {
  await execFileAsync('magick', [
    resolve(assetsDir, filename),
    '-auto-orient',
    '-strip',
    '-resize',
    `${thumbnailWidth}x${thumbnailWidth}>`,
    '-quality',
    String(thumbnailQuality),
    '-define',
    'webp:method=6',
    resolve(thumbnailsDir, filename),
  ]);
}

for (let offset = 0; offset < sourceFiles.length; offset += batchSize) {
  await Promise.all(sourceFiles.slice(offset, offset + batchSize).map(generateThumbnail));
}

const totalBytes = (
  await Promise.all(sourceFiles.map((filename) => stat(resolve(thumbnailsDir, filename))))
).reduce((total, file) => total + file.size, 0);

console.log(
  `Generated ${sourceFiles.length} thumbnails (${thumbnailWidth}px, WebP q${thumbnailQuality}, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB) and removed ${staleThumbnails.length} stale files.`,
);
