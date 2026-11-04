// Generates the web-ready images in public/assets from the originals.
//
//   npm run optimize-images                 # everything
//   npm run optimize-images -- photos       # gallery only
//   npm run optimize-images -- backgrounds  # page backgrounds only
//
// Gallery: put original photos in images-src/photos (not deployed). Each one becomes
//   public/assets/photos/<name>.webp         full size for the photo viewer (max 2000px)
//   public/assets/photos/thumbs/<name>.webp  grid thumbnail (900px wide)
// New photos also need an entry in PHOTOS in src/components/Media.jsx.
//
// Backgrounds: public/assets/<page>.jpg -> public/assets/<page>.webp
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ASSETS = path.join(ROOT, 'public', 'assets');
const PHOTO_SRC = path.join(ROOT, 'images-src', 'photos');
const PHOTO_OUT = path.join(ASSETS, 'photos');
const THUMB_OUT = path.join(PHOTO_OUT, 'thumbs');

const images = (dir) => fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
const webpName = (file) => file.replace(/\.(jpe?g|png)$/i, '.webp');
const log = (file) => console.log('  ' + path.relative(ROOT, file));

async function photos() {
  fs.mkdirSync(THUMB_OUT, { recursive: true });
  for (const file of images(PHOTO_SRC)) {
    const src = path.join(PHOTO_SRC, file);
    const full = path.join(PHOTO_OUT, webpName(file));
    const thumb = path.join(THUMB_OUT, webpName(file));
    await sharp(src).rotate().resize(2000, 2000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(full);
    await sharp(src).rotate().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 78 }).toFile(thumb);
    log(full);
    log(thumb);
  }
}

async function backgrounds() {
  for (const file of images(ASSETS)) {
    if (file === 'signature.png') continue;
    const out = path.join(ASSETS, webpName(file));
    await sharp(path.join(ASSETS, file)).rotate().webp({ quality: 80 }).toFile(out);
    log(out);
  }
}

async function run() {
  const only = process.argv[2];
  if (!only || only === 'photos') await photos();
  if (!only || only === 'backgrounds') await backgrounds();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
