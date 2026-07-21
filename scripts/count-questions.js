const fs = require('fs');
const path = require('path');

const soruDir = path.join(__dirname, '..', 'src', 'data', 'sorular');
const files = fs.readdirSync(soruDir).filter(f => f.endsWith('.ts'));

const counts = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(soruDir, f), 'utf8');
  const matches = content.match(/konuId:\s*["']([^"']+)["']/g) || [];
  matches.forEach(m => {
    const id = m.match(/["']([^"']+)["']/)[1];
    counts[id] = (counts[id] || 0) + 1;
  });
});

const allTopics = [
  'trafik-kavramlar','trafik-isaretleri','yer-isaretlemeleri','isikli-isaretler',
  'gecis-ustunlugu','hiz-kurallari','sollama','duraklama-park','yaya-gecit',
  'aydinlatma-sinyal','cevre-guvenlik','belgeler-cezalar',
  'mt-motor-calisma','mt-yaglama-sogutma','mt-yakit-atesleme','mt-aktarma',
  'mt-fren','mt-elektrik-aku','mt-lastik-bakim','mt-gosterge-guvenlik',
  'iy-temel-kavramlar','iy-olay-yeri','iy-tyd','iy-tikanma',
  'iy-kanama-sok','iy-kirik-yanik','iy-bilinc-tasima',
  'ad-temel-degerler','ad-ofke-stres','ad-takip-mesafesi','ad-alkol-yorgunluk','ad-kaza-davranis'
];

let total = 0;
allTopics.forEach(t => {
  const c = counts[t] || 0;
  total += c;
  const needed = Math.max(0, 15 - c);
  console.log(t + ': ' + c + (needed > 0 ? ' (NEED +' + needed + ')' : ' OK'));
});
console.log('TOTAL: ' + total);
