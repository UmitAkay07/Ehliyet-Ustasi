const fs = require("fs");
const path = require("path");

const speechJs = path.join(__dirname, "node_modules", "expo-speech", "build", "Speech.js");

function patchExpoSpeech() {
  if (!fs.existsSync(speechJs)) return;
  let src = fs.readFileSync(speechJs, "utf8");
  if (!src.includes('from "./Speech.types"') && !src.includes("from './Speech.types'")) {
    return;
  }
  src = src.replace(
    /import \{ VoiceQuality \} from ['"]\.\/Speech\.types(?:\.js)?['"];\s*export \{ VoiceQuality \};/,
    [
      "/** Patched: Metro on Windows can fail resolving ./Speech.types */",
      "export const VoiceQuality = {",
      '    Default: "Default",',
      '    Enhanced: "Enhanced",',
      "};",
    ].join("\n")
  );
  fs.writeFileSync(speechJs, src);
  console.log("patched expo-speech Speech.js");
}

patchExpoSpeech();
