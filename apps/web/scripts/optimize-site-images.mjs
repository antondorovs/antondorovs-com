// Re-encode display assets; the original PNG files are never modified.
// Usage: node scripts/optimize-site-images.mjs [path-to-sharp]
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] || 'sharp');
const asset = (name) => fileURLToPath(new URL(`../src/assets/site/${name}`, import.meta.url));

await sharp(asset('wall_quality.PNG'))
  .webp({ quality: 88, effort: 6 })
  .toFile(asset('wall_quality.webp'));
await sharp(asset('AntonDorovs.png'))
  .resize({ width: 390, height: 390, fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 88, effort: 6 })
  .toFile(asset('AntonDorovs.webp'));
