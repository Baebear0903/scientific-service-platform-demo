const fs = require('fs');

function findDups(arr) {
  const seen = new Set();
  const dups = new Set();
  arr.forEach(a => {
    if (seen.has(a)) dups.add(a);
    seen.add(a);
  });
  return Array.from(dups);
}

const text = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\[([^\]]+)\]\.map\(/g;
let match;
while ((match = regex.exec(text)) !== null) {
  const content = match[1];
  // naive check 
  if (content.includes('label:')) {
    const labels = [...content.matchAll(/label:\s*'([^']+)'/g)].map(m => m[1]);
    const dups = findDups(labels);
    if (dups.length > 0) {
      console.log('Duplicate labels found:', dups, 'in', content.substring(0, 50));
    }
  } else {
    // maybe primitive?
    const primitives = content.split(',').map(s => s.trim().replace(/['"]/g, ''));
    if (primitives.length > 0 && primitives[0] !== '{') {
      const dups = findDups(primitives);
      if (dups.length > 0) {
        console.log('Duplicate primitives found:', dups, 'in', content);
      }
    }
  }
}
