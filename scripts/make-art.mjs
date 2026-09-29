// Makes web-sized copies of the saga artwork. The originals in src/assets/sagas
// stay untouched; the app only imports what lands in src/assets/sagas/web.
// Run it again whenever you add or replace a saga piece: npm run art
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE = 'src/assets/sagas';
const OUT = path.join(SOURCE, 'web');
const WIDTHS = [960, 1920];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SOURCE)).filter(f => /\.(jpe?g|png)$/i.test(f) && !/copy/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    const target = path.join(OUT, `${name}-${width}.webp`);
    await sharp(path.join(SOURCE, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width > 1000 ? 76 : 72 })
      .withMetadata({ exif: { IFD0: { ImageDescription: `Resized from ${SOURCE}/${file}. Original saga artwork by the Eternal Pose author.` } } })
      .toFile(target);
  }
  console.log(`${file} -> ${WIDTHS.map(w => `${name}-${w}.webp`).join(', ')}`);
}
