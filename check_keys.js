import fs from 'fs';
const text = fs.readFileSync('src/App.tsx', 'utf8');
const lines = text.split('\n');
lines.forEach((line, i) => {
  if (line.includes('key=')) {
    console.log(`${i+1}: ${line.trim()}`);
  }
});
