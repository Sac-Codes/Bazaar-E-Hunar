const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Read the Excel file
const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses).xlsx');
const workbook = xlsx.readFile(filePath);

// Get all sheet names
console.log('=== Sheet Names ===');
console.log(workbook.SheetNames);

// Read the "Valid Responses" sheet
const sheetName = 'Valid Responses';
const sheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

console.log(`\n=== Total Rows in "${sheetName}": ${data.length} ===\n`);

// Show all column headers from first row
console.log('=== Column Headers ===');
const headers = Object.keys(data[0] || {});
headers.forEach((h, i) => console.log(`${i + 1}. "${h}"`));

// Show first 3 entries
console.log('\n=== First 3 Entries ===');
for (let i = 0; i < Math.min(3, data.length); i++) {
  console.log(`\n--- Entry ${i + 1} ---`);
  const entry = data[i];
  for (const key of headers) {
    console.log(`${key}: ${entry[key]}`);
  }
}

// Show last 3 entries
console.log('\n=== Last 3 Entries ===');
for (let i = Math.max(0, data.length - 3); i < data.length; i++) {
  console.log(`\n--- Entry ${i + 1} ---`);
  const entry = data[i];
  for (const key of headers) {
    console.log(`${key}: ${entry[key]}`);
  }
}

