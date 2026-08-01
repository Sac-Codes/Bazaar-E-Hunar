const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses).xlsx');
const wb = xlsx.readFile(filePath);

// Check Valid Responses sheet
const sheet2 = wb.Sheets['Valid Responses'];
if (sheet2) {
  const data2 = xlsx.utils.sheet_to_json(sheet2, { defval: '', raw: true });
  console.log('=== Valid Responses Sheet ===');
  console.log('Total rows:', data2.length);
  if (data2.length > 0) {
    console.log('Headers:', JSON.stringify(Object.keys(data2[0]), null, 2));
    console.log('First row:', JSON.stringify(data2[0], null, 2));
    console.log('Last row:', JSON.stringify(data2[data2.length-1], null, 2));
  }
} else {
  console.log('No "Valid Responses" sheet found');
}

// Check Form Responses 1 sheet
const sheet1 = wb.Sheets['Form Responses 1'];
const data1 = xlsx.utils.sheet_to_json(sheet1, { defval: '', raw: true });
console.log('\n=== Form Responses 1 Sheet ===');
console.log('Total rows:', data1.length);
