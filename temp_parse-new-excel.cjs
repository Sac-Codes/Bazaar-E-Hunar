const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses) (2).xlsx');
const workbook = xlsx.readFile(filePath);

console.log('Sheet Names:', JSON.stringify(workbook.SheetNames));

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

console.log('Total Rows:', data.length);

// Show headers
const headers = Object.keys(data[0] || {});
console.log('\nHeaders:');
headers.forEach((h, i) => console.log((i + 1) + '. "' + h + '"'));

// Show all entries with key fields
console.log('\n=== ALL ENTRIES ===');
data.forEach((row, i) => {
  console.log('\n--- Row ' + (i + 1) + ' ---');
  headers.forEach(h => {
    console.log(h + ': ' + row[h]);
  });
});

