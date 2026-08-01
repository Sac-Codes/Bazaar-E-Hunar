const fs = require('fs');
const path = require('path');

// 1. Count stalls
const stallsSrc = fs.readFileSync(path.join(__dirname, 'src/data/stalls.ts'), 'utf8');
const ids = [...stallsSrc.matchAll(/id:\s*["'](S-\d+)["']/g)].map((m) => m[1]);
console.log('Total stalls in stalls.ts:', ids.length);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log('Duplicate IDs:', dupIds.length ? dupIds.join(', ') : 'none');
console.log('First:', ids[0], 'Last:', ids[ids.length - 1]);

// Verify uniqueness of phone numbers
const phones = [...stallsSrc.matchAll(/phone:\s*["']([^"']*)["']/g)].map((m) => m[1]);
const dupPhones = phones.filter((p, i) => p && phones.indexOf(p) !== i);
console.log('Duplicate phone numbers:', dupPhones.length ? [...new Set(dupPhones)].join(', ') : 'none');

// 2. Search for registration references in all src files
function walk(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f === 'node_modules' || f === 'dist' || f === '.git') continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) results = results.concat(walk(full));
    else if (/\.(tsx|ts|html)$/.test(f)) results.push(full);
  }
  return results;
}

const files = walk(path.join(__dirname, 'src'));
const registerRegex = /register|registration|Register|Registration|docs\.google\.com|googleForm|Google Form/g;
console.log('\n=== FILES WITH REGISTRATION REFERENCES ===');
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(registerRegex);
  if (matches && matches.length) {
    const lines = content.split('\n');
    console.log(`\n--- ${file.replace(__dirname + '/', '')} (${matches.length} refs) ---`);
    lines.forEach((line, i) => {
      if (registerRegex.test(line)) {
        console.log(`  ${i + 1}: ${line.trim().slice(0, 140)}`);
      }
    });
  }
}

