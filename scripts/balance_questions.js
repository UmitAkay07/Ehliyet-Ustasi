const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const dir = path.join(__dirname, '..', 'src', 'data', 'sorular');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const BATCH_SIZE = 5;

async function processFile(filename) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract all questions with a regex
  // This is a naive regex but works for the structure of the TS files
  const qRegex = /\{\s*id:\s*"([^"]+)",[\s\S]*?metin:\s*"([^"\\]*(?:\\.[^"\\]*)*)",\s*secenekler:\s*\[([\s\S]*?)\],\s*dogruIndex:\s*(\d)/g;
  
  const unbalanced = [];
  let m;
  
  while ((m = qRegex.exec(content)) !== null) {
    const id = m[1];
    const metin = m[2];
    const optionsRaw = m[3];
    const dogruIndex = parseInt(m[4]);
    
    const options = [];
    const optRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    let optM;
    while ((optM = optRegex.exec(optionsRaw)) !== null) {
      options.push(optM[1]);
    }
    
    if (options.length === 4) {
      const correctLength = options[dogruIndex].length;
      const maxOther = Math.max(...options.filter((_, i) => i !== dogruIndex).map(o => o.length));
      
      if (correctLength > 30 && correctLength > maxOther * 1.5) {
        unbalanced.push({
          id,
          metin,
          secenekler: options,
          dogruIndex,
          optionsRaw
        });
      }
    }
  }
  
  console.log(`[${filename}] Found ${unbalanced.length} unbalanced questions.`);
  
  for (let i = 0; i < unbalanced.length; i += BATCH_SIZE) {
    const batch = unbalanced.slice(i, i + BATCH_SIZE);
    console.log(`[${filename}] Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(unbalanced.length/BATCH_SIZE)}...`);
    
    try {
      const prompt = `Sen bir ehliyet sınavı hazırlık uzmanısın. Aşağıdaki sorularda doğru cevap (dogruIndex) çok uzun olduğu için cevabın ne olduğu okunmadan belli oluyor.
Görev: YANLIŞ olan 3 şıkkı, doğru şıkkın uzunluğuna ve yapısal formatına (cümle yapısı vs.) benzeyecek şekilde uzat ve mantıklı çeldiriciler haline getir.
KESİNLİKLE doğru şıkka ve soru metnine dokunma. Sadece yanlış şıkları değiştir.

Sorular (JSON formatında):
${JSON.stringify(batch.map(q => ({ id: q.id, metin: q.metin, secenekler: q.secenekler, dogruIndex: q.dogruIndex })), null, 2)}

ÇIKTI FORMATI:
Sadece güncellenmiş soruları içeren düz bir JSON dizisi (Array) döndür. Başka hiçbir açıklama yazma.
Örnek:
[
  {
    "id": "q-1",
    "secenekler": ["uzun yanlış", "uzun doğru", "uzun yanlış", "uzun yanlış"]
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });
      
      let text = response.text;
      // Extract JSON array
      const jsonMatch = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        const results = JSON.parse(jsonMatch[0]);
        
        for (const res of results) {
          const originalQ = batch.find(q => q.id === res.id);
          if (originalQ && res.secenekler && res.secenekler.length === 4) {
            const oldOptionsRaw = originalQ.optionsRaw;
            const newOptionsRaw = res.secenekler.map(s => `"${s}"`).join(", ");
            content = content.replace(`[${oldOptionsRaw}]`, `[${newOptionsRaw}]`);
          }
        }
      }
    } catch (err) {
      console.error(`Error processing batch in ${filename}:`, err.message);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`[${filename}] Successfully updated and saved.\n`);
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Lütfen GEMINI_API_KEY ortam değişkenini ayarlayın.");
    process.exit(1);
  }
  
  console.log("Soru dengeleme işlemi başlıyor...\n");
  for (const file of files) {
    await processFile(file);
  }
  console.log("Tüm dosyalar başarıyla güncellendi!");
}

main();
