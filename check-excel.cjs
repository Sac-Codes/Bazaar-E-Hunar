const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses).xlsx');
const wb = xlsx.readFile(filePath);
console.log('Sheet names:', JSON.stringify(wb.SheetNames));
const sheet = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });
console.log('Total rows:', data.length);
console.log('Headers:', JSON.stringify(Object.keys(data[0]), null, 2));
if (data.length > 0) {
  console.log('First row sample:', JSON.stringify(data[0], null, 2));
  console.log('Last row sample:', JSON.stringify(data[data.length-1], null, 2));
}

