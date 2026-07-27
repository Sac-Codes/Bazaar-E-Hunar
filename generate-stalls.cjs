const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses).xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets['Valid Responses'];
const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });

// Show categories
console.log('\n=== All Categories Found ===');
const categories = new Set();
data.forEach(row => {
  categories.add(row['Stall Category.']);
});
categories.forEach(c => console.log(`- "${c}"`));

// Show all stall names
console.log('\n=== All Stall Names ===');
data.forEach((row, i) => {
  console.log(`${i + 1}. "${row['  Proposed Stall Name.  ']}", Category: "${row['Stall Category.']}", Student: "${row['Please Enter Your Name.']}", Class: "${row['Please Enter Your Class.']} ${row['Please Enter Your Section.']}"`);
});

// Show all entries detail for mapping
data.forEach((row, i) => {
  console.log(`\n===== STALL ${i + 1} =====`);
  console.log(`Name: "${row['  Proposed Stall Name.  ']}"`);
  console.log(`Owner: "${row['Please Enter Your Name.']}"`);
  console.log(`Class: "${row['Please Enter Your Class.']}"`);
  console.log(`Section: "${row['Please Enter Your Section.']}"`);
  console.log(`Phone: "${row['Please Enter Your Contact Number.']}"`);
  console.log(`Type: "${row['Participation Type.']}"`);
  console.log(`Team: "${row['Enter Team Members Details (Name - Class)']}"`);
  console.log(`Category: "${row['Stall Category.']}"`);
  console.log(`Description: "${row['Brief Description of Your Stall']}"`);
  console.log(`Price: "${row['  Approximate Price Range of Your Products  ']}"`);
  console.log(`Investment: "${row['  Estimated Initial Investment (₹)  ']}"`);
  console.log(`Requirements: "${row['  Any Requirements (Electricity/More Than 1 Table/Chairs)']}"`);
});

