const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 64x64 SVG icon with circular background and constellation nodes
// High-contrast dark badge (#090d16) with subtle border (#1e293b), cyan core (#38bdf8), and 8 orbiting white nodes
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect width="64" height="64" rx="16" fill="#090d16"/>
  <circle cx="32" cy="32" r="26" stroke="#1e293b" stroke-width="2" fill="none"/>
  <!-- Central core -->
  <circle cx="32" cy="32" r="6" fill="#38bdf8"/>
  <!-- 8 satellite nodes in circular orbit (r=17) -->
  <circle cx="32" cy="15" r="3.6" fill="#ffffff"/>
  <circle cx="44.02" cy="19.98" r="3.6" fill="#ffffff"/>
  <circle cx="49" cy="32" r="3.6" fill="#ffffff"/>
  <circle cx="44.02" cy="44.02" r="3.6" fill="#ffffff"/>
  <circle cx="32" cy="49" r="3.6" fill="#ffffff"/>
  <circle cx="19.98" cy="44.02" r="3.6" fill="#ffffff"/>
  <circle cx="15" cy="32" r="3.6" fill="#ffffff"/>
  <circle cx="19.98" cy="19.98" r="3.6" fill="#ffffff"/>
</svg>`;

const baseDir = path.join(__dirname, '..');

fs.writeFileSync(path.join(baseDir, 'src', 'app', 'icon.svg'), svgContent, 'utf8');
fs.writeFileSync(path.join(baseDir, 'public', 'icon.svg'), svgContent, 'utf8');

const svgBuffer = Buffer.from(svgContent);

Promise.all([
  sharp(svgBuffer).resize(32, 32).png().toFile(path.join(baseDir, 'public', 'icon.png')),
  sharp(svgBuffer).resize(32, 32).png().toFile(path.join(baseDir, 'src', 'app', 'icon.png')),
  sharp(svgBuffer).resize(180, 180).png().toFile(path.join(baseDir, 'public', 'apple-icon.png')),
  sharp(svgBuffer).resize(180, 180).png().toFile(path.join(baseDir, 'src', 'app', 'apple-icon.png')),
  sharp(svgBuffer).resize(32, 32).toFormat('png').toBuffer().then(buf => {
    // 32x32 standard ICO header
    const icoHeader = Buffer.from([
      0, 0, 1, 0, 1, 0,
      32, 32, 0, 0, 1, 0, 32, 0,
      buf.length & 0xff, (buf.length >> 8) & 0xff, (buf.length >> 16) & 0xff, (buf.length >> 24) & 0xff,
      22, 0, 0, 0
    ]);
    const ico = Buffer.concat([icoHeader, buf]);
    fs.writeFileSync(path.join(baseDir, 'public', 'favicon.ico'), ico);
    fs.writeFileSync(path.join(baseDir, 'src', 'app', 'favicon.ico'), ico);
  })
]).then(() => {
  console.log('SUCCESS: All icon assets generated and saved to src/app and public!');
}).catch(err => {
  console.error('ERROR generating icons:', err);
});
