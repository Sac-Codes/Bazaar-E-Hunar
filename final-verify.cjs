/**
 * Final Manual Verification of 8 New Stall Candidates
 * Extracts full details from Excel for human review
 */
const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses) (4).xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets['Form Responses 1'];
const data = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });

// The 8 candidate rows (0-indexed: rows 87-94 = indices 86-93)
const candidateRows = [86, 87, 88, 89, 90, 91, 92, 93];

const headers = Object.keys(data[0]);

console.log('=== MANUAL VERIFICATION OF 8 NEW STALL CANDIDATES ===\n');

candidateRows.forEach(idx => {
  const row = data[idx];
  const rowNum = idx + 1;
  
  console.log(`--- Row ${rowNum} ---`);
  console.log(`Timestamp: ${row['Timestamp']}`);
  console.log(`Stall Name: "${row['  Proposed Stall Name.  ']}"`);
  console.log(`Owner: "${row['Please Enter Your Name.']}"`);
  console.log(`Class: ${row['Please Enter Your Class.']} ${row['Please Enter Your Section.']}`);
  console.log(`Phone: ${row['Please Enter Your Contact Number.']}`);
  console.log(`Category: "${row['Stall Category.']}"`);
  console.log(`Team: "${row['Enter Team Members Details (Name - Class)']}"`);
  console.log(`Description: "${(row['Brief Description of Your Stall'] || '').substring(0, 100)}"`);
  console.log(`Price: "${row['  Approximate Price Range of Your Products  ']}"`);
  console.log(`Investment: "${row['  Estimated Initial Investment (₹)  ']}"`);
  console.log(`Requirements: "${row['  Any Requirements (Electricity/More Than 1 Table/Chairs)']}"`);
  console.log('');
});

