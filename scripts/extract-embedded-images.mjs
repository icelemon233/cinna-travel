import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const htmlPath = resolve(rootDir, 'index.html');
const assetsDir = resolve(rootDir, 'public', 'travel-assets');
const embeddedImagePattern = /data:image\/(webp|jpe?g|png);base64,([A-Za-z0-9+/=]+)/g;

await mkdir(assetsDir, { recursive: true });

const source = await readFile(htmlPath, 'utf8');
const images = new Map();
const output = source.replace(embeddedImagePattern, (_match, imageType, base64) => {
  const contents = Buffer.from(base64, 'base64');
  const hash = createHash('sha256').update(contents).digest('hex').slice(0, 16);
  const extension = imageType === 'jpeg' || imageType === 'jpg' ? 'jpg' : imageType;
  const filename = `${hash}.${extension}`;
  images.set(filename, contents);
  return `./travel-assets/${filename}`;
});

await Promise.all(
  [...images].map(([filename, contents]) =>
    writeFile(resolve(assetsDir, filename), contents),
  ),
);
await writeFile(htmlPath, output);

console.log(`Extracted ${images.size} unique images to public/travel-assets.`);
