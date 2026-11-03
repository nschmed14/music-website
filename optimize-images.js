// Generates WebP versions of the site images and smaller gallery thumbnails.
// Run after adding or replacing images: `node optimize-images.js`
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = path.join(__dirname, 'public', 'assets');
const PHOTOS = path.join(ASSETS, 'photos');
const THUMBS = path.join(PHOTOS, 'thumbs');

const jpgs = (dir) =>
  fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).map((f) => path.join(dir, f));

const toWebp = (file) => file.replace(/\.(jpe?g|png)$/i, '.webp');

async function run() {
  fs.mkdirSync(THUMBS, { recursive: true });

  for (const file of [...jpgs(ASSETS), ...jpgs(PHOTOS)]) {
    if (file.endsWith('signature.png')) continue;
    await sharp(file).rotate().webp({ quality: 80 }).toFile(toWebp(file));
    console.log('webp ', path.relative(__dirname, toWebp(file)));
  }

  // Gallery grid thumbnails (full-size images are only loaded in the viewer)
  for (const file of jpgs(PHOTOS)) {
    const out = path.join(THUMBS, path.basename(toWebp(file)));
    await sharp(file).rotate().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    console.log('thumb', path.relative(__dirname, out));
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
