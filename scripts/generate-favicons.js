import * as Jimp from 'jimp';
import pngToIco from 'png-to-ico';
import path from 'path';
import fs from 'fs';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node generate-favicons.cjs <input-image-path>');
  process.exit(1);
}

(async () => {
  const outDir = path.dirname(input);
  const img = await Jimp.read(input);
  const sizes = [16, 32, 48, 192];
  for (const s of sizes) {
    const out = path.join(outDir, `favicon-${s}.png`);
    const clone = img.clone();
    await clone.cover(s, s, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
      .resize(s, s)
      .writeAsync(out);
  }
  // create a 192x192 main PNG as favicon.png
  const favPng = path.join(outDir, 'favicon.png');
  await img.clone().cover(192,192).resize(192,192).writeAsync(favPng);

  const icoBuf = await pngToIco([
    path.join(outDir, 'favicon-16.png'),
    path.join(outDir, 'favicon-32.png'),
    path.join(outDir, 'favicon-48.png')
  ]);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf);
  console.log('Favicons generated in', outDir);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
