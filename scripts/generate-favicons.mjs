import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node generate-favicons.mjs <input-image-path>');
  process.exit(1);
}

const outDir = path.dirname(input);
const sizes = [16, 32, 48, 192];

(async () => {
  try {
    const img = sharp(input).rotate();
    for (const s of sizes) {
      const out = path.join(outDir, `favicon-${s}.png`);
      await img.clone().resize({ width: s, height: s, fit: 'cover' }).png().toFile(out);
    }
    // main favicon.png (192)
    await img.clone().resize({ width: 192, height: 192, fit: 'cover' }).png().toFile(path.join(outDir, 'favicon.png'));

    const icoBuffer = await pngToIco([
      path.join(outDir, 'favicon-16.png'),
      path.join(outDir, 'favicon-32.png'),
      path.join(outDir, 'favicon-48.png')
    ]);
    fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuffer);
    console.log('Favicons generated in', outDir);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
