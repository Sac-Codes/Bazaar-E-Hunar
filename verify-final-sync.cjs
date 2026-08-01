/**
 * FINAL DATASET SYNCHRONIZATION VERIFICATION
 *
 * Hunar Bazaar 2026 — Final Production Update
 *
 * Parses: src/assets/Hunar Bazaar 2026 (Responses).xlsx (source of truth)
 * Compares against: src/data/stalls.ts (current dataset, 100 stalls S-001..S-100)
 *
 * Applies:
 * - Duplicate detection (name, phone, owner, team)
 * - Spam / test / incomplete filtering
 * - Invalid phone numbers
 * - Latest valid submission rule (for multiple team submissions)
 * - Fuzzy stall name matching
 *
 * Output: list of genuinely new valid stalls OR confirmation that the dataset is synchronized.
 */

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// ═══════════════════════════════════════════════════
// 1. LOAD EXISTING STALLS from stalls.ts (parse TS data)
// ═══════════════════════════════════════════════════

const stallsPath = path.join(__dirname, 'src', 'data', 'stalls.ts');
const stallsSource = fs.readFileSync(stallsPath, 'utf8');

// Extract each stall object block between { and } at depth 1.
function extractStalls(source) {
  const results = [];
  const lines = source.split('\n');
  let current = null;
  let braceDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed === '') continue;

    for (const ch of line) {
      if (ch === '{') {
        braceDepth++;
        if (braceDepth === 1) current = [];
      } else if (ch === '}') {
        if (braceDepth === 1 && current) {
          current.push(line);
          results.push(parseStall(current.join('\n')));
          current = null;
        } else if (current) {
          current.push(line);
        }
        braceDepth = Math.max(0, braceDepth - 1);
      } else if (braceDepth >= 1 && current) {
        current.push(line);
      }
    }
  }
  return results.filter(Boolean);
}

function parseStall(block) {
  const get = (key) => {
    const re = new RegExp(`${key}:\\s*["'\`](.*?)["'\`],?\\s*$`, 'm');
    const m = block.match(re);
    return m ? m[1] : '';
  };
  return {
    id: get('id'),
    name: get('name'),
    owner: get('owner'),
    phone: get('phone'),
    category: get('category'),
  };
}

const existingStalls = extractStalls(stallsSource);
console.log(`Parsed ${existingStalls.length} existing stalls from stalls.ts`);

// Build lookup maps
const existingNameSet = new Set(existingStalls.map((s) => normalizeName(s.name)));
const existingPhoneSet = new Set(existingStalls.map((s) => normalizePhone(s.phone)));
const existingOwnerSet = new Set(existingStalls.map((s) => normalizeOwner(s.owner)));

// ═══════════════════════════════════════════════════
// 2. HELPER FUNCTIONS
// ═══════════════════════════════════════════════════

function normalizeName(name) {
  return String(name || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeOwner(owner) {
  return String(owner || '')
    .toString()
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizePhone(phone) {
  if (!phone) return '';
  return String(phone).replace(/[^0-9]/g, '').slice(-10);
}

function normalizeCategory(cat) {
  return String(cat || '').replace(/[^\w\s&,-]/g, '').trim();
}

function isSpamOrInvalid(entry) {
  const name = (entry.name || '').toString().trim();
  const owner = (entry.owner || '').toString().trim();
  const phone = entry.phone;
  const category = (entry.category || '').toString().trim();
  const description = (entry.description || '').toString().toLowerCase().trim();
  const ownerLower = owner.toLowerCase();

  if (!name || name.length < 2) return 'Stall name too short or empty';
  if (!owner || owner.length < 2) return 'Owner name too short or empty';

  // Phone validation — must be a valid 10-digit Indian mobile number
  if (!phone || phone.length !== 10) return `Invalid phone number: "${entry.rawPhone || phone}"`;
  if (!/^[6-9]\d{9}$/.test(phone)) return `Phone number does not look like a valid mobile: "${phone}"`;

  if (!category || category.length < 2) return 'Missing category';

  const spamNames = ['test', 'abc', 'xyz', 'asdf', 'qwerty', 'admin', 'user', 'demo', 'sample', 'null', 'undefined', 'na', 'n/a', 'none', 'nil', 'spam', 'dummy', 'fake', 'abcd', 'asdfgh', 'testing', 'lorem', 'random', 'example'];
  if (spamNames.some((s) => ownerLower.includes(s)) && ownerLower.length < 12) {
    return 'Spam/test name detected';
  }

  if ((description.includes('test') || description.includes('demo')) && description.length < 30 && ownerLower.includes('test')) {
    return 'Test/invalid description';
  }

  const alphaRatio = (name.replace(/[^a-zA-Z]/g, '').length) / Math.max(name.length, 1);
  if (alphaRatio < 0.3 && name.length > 3 && owner.length < 5) return 'Gibberish name';

  return null; // Valid
}

function isDuplicateOfExisting(name, owner, phone) {
  const normName = normalizeName(name);
  const normOwner = normalizeOwner(owner);
  const normPhone = normalizePhone(phone);

  for (const existingName of existingNameSet) {
    if (existingName === normName) return true;
    if (normName.length >= 5 && existingName.includes(normName)) return true;
    if (existingName.length >= 5 && normName.includes(existingName)) return true;
  }

  if (normPhone && normPhone.length === 10 && existingPhoneSet.has(normPhone)) return true;

  for (const existingOwner of existingOwnerSet) {
    if (existingOwner === normOwner) return true;
    if (normOwner.length >= 5 && existingOwner.includes(normOwner)) return true;
    if (existingOwner.length >= 5 && normOwner.includes(existingOwner)) return true;
  }

  return false;
}

// ═══════════════════════════════════════════════════
// 3. LOAD EXCEL
// ═══════════════════════════════════════════════════

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses).xlsx');
if (!fs.existsSync(filePath)) {
  console.error('❌ Excel file not found:', filePath);
  process.exit(1);
}

const workbook = xlsx.readFile(filePath);
const sheetNames = workbook.SheetNames;
console.log(`Excel sheets: ${sheetNames.join(', ')}`);

const primarySheetName = sheetNames.find((n) => /response/i.test(n)) || sheetNames[0];
const sheet = workbook.Sheets[primarySheetName];
const rawData = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });

console.log('═══════════════════════════════════════════════');
console.log('  HUNAR BAZAAR 2026 — FINAL DATASET SYNC CHECK');
console.log('═══════════════════════════════════════════════\n');
console.log(`Excel file: Hunar Bazaar 2026 (Responses).xlsx`);
console.log(`Sheet: "${primarySheetName}"`);
console.log(`Total rows in Excel: ${rawData.length}`);
console.log(`Existing stalls in stalls.ts: ${existingStalls.length}\n`);

const headers = Object.keys(rawData[0] || {});
console.log('Excel headers:', headers.map((h) => `"${h}"`).join(', '));

function findColumn(keywords) {
  for (const h of headers) {
    const hl = h.toLowerCase();
    for (const kw of keywords) {
      if (hl.includes(kw)) return h;
    }
  }
  return null;
}

const colTimestamp = findColumn(['timestamp']) || headers[0];
const colName = findColumn(['stall name', 'proposed stall', 'name of stall', 'stall']) || headers.find((h, i) => i === 7) || headers[7];
const colOwner = findColumn(['your name', 'enter your name', 'name of the student', 'student name']) || headers[1];
const colClass = findColumn(['your class', 'enter your class', 'class']) || headers[2];
const colSection = findColumn(['section']) || headers[3];
const colPhone = findColumn(['contact', 'phone', 'number', 'mobile']) || headers[4];
const colTeam = findColumn(['team member', 'member details', 'team']) || headers[6];
const colCategory = findColumn(['category', 'stall category', 'type of stall']) || headers[8];
const colDescription = findColumn(['description', 'brief']) || headers[9];
const colPrice = findColumn(['price range']) || headers[10];
const colInvestment = findColumn(['investment']) || headers[11];
const colRequirements = findColumn(['requirement']) || headers[12];

console.log('Column mapping:');
console.log(`  Timestamp: "${colTimestamp}"`);
console.log(`  Name: "${colName}"`);
console.log(`  Owner: "${colOwner}"`);
console.log(`  Phone: "${colPhone}"`);
console.log(`  Category: "${colCategory}"\n`);

// ═══════════════════════════════════════════════════
// 4. PARSE ALL ENTRIES
// ═══════════════════════════════════════════════════

const parsed = [];
for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i];
  const timestamp = row[colTimestamp];
  const name = (row[colName] || '').toString().trim();
  const owner = (row[colOwner] || '').toString().trim();
  const classRaw = (row[colClass] || '').toString().trim();
  const section = (row[colSection] || '').toString().trim();
  const rawPhone = row[colPhone];
  const phone = normalizePhone(rawPhone);
  const team = (row[colTeam] || '').toString().trim();
  const category = normalizeCategory((row[colCategory] || '').toString().trim());
  const description = (row[colDescription] || '').toString().trim();
  const price = (row[colPrice] || '').toString().trim();
  const investment = (row[colInvestment] || '').toString().trim();
  const requirements = (row[colRequirements] || '').toString().trim();

  let classStr = classRaw;
  if (section && !classStr.includes(section)) {
    classStr = (classStr + ' ' + section).trim();
  }

  parsed.push({
    row: i + 1,
    timestamp,
    name,
    owner,
    classStr,
    phone,
    rawPhone,
    category,
    team,
    description,
    priceRange: price,
    investment,
    requirements,
    rawTimestamp: timestamp,
  });
}

// ═══════════════════════════════════════════════════
// 5. DETECT DUPLICATES WITHIN EXCEL (latest-submission rule)
// ═══════════════════════════════════════════════════

const toDateVal = (ts) => {
  // Excel serial date number or JS Date
  if (typeof ts === 'number') return ts;
  if (ts instanceof Date) return ts.getTime();
  if (typeof ts === 'string') {
    const d = new Date(ts);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return 0;
};

const duplicateEntryRows = new Set();
const resolvedEntries = new Map();

// Group by phone (primary) — the same registrant may submit multiple times
const phoneGroups = new Map();
for (const entry of parsed) {
  if (entry.phone && entry.phone.length === 10) {
    if (!phoneGroups.has(entry.phone)) phoneGroups.set(entry.phone, []);
    phoneGroups.get(entry.phone).push(entry);
  }
}

for (const [phone, entries] of phoneGroups) {
  // Normalize names within this group to find near-identical submissions
  const normalizedNames = entries.map((e) => normalizeName(e.name));
  const used = new Set();
  for (let i = 0; i < entries.length; i++) {
    if (used.has(i)) continue;
    const cluster = [entries[i]];
    used.add(i);
    for (let j = i + 1; j < entries.length; j++) {
      if (used.has(j)) continue;
      const ni = normalizedNames[i];
      const nj = normalizedNames[j];
      const sameName =
        ni === nj ||
        (ni.includes(nj) && nj.length >= 4) ||
        (nj.includes(ni) && ni.length >= 4);
      const sameOwner = normalizeOwner(entries[i].owner) === normalizeOwner(entries[j].owner);
      const sameTeam = normalizeName(entries[i].team) === normalizeName(entries[j].team) && normalizeName(entries[i].team).length > 5;
      if (sameName || sameOwner || sameTeam) {
        cluster.push(entries[j]);
        used.add(j);
      }
    }
    // Latest submission rule → keep the LATEST valid timestamp entry as official
    cluster.sort((a, b) => toDateVal(b.rawTimestamp) - toDateVal(a.rawTimestamp));
    const latest = cluster[0];
    resolvedEntries.set(`${phone}_${i}`, latest);
    for (let k = 1; k < cluster.length; k++) {
      duplicateEntryRows.add(cluster[k].row);
    }
  }
}

// Entries with no phone still need to be represented
for (const entry of parsed) {
  if (entry.phone && entry.phone.length === 10) continue;
  if (!duplicateEntryRows.has(entry.row)) {
    resolvedEntries.set(`nophone_${entry.row}`, entry);
  }
}

// ═══════════════════════════════════════════════════
// 6. VALIDATE + COMPARE
// ═══════════════════════════════════════════════════

console.log('─── ENTRY VALIDATION vs EXISTING DATASET ───\n');

const uniqueEntries = [];
for (const entry of resolvedEntries.values()) {
  if (!duplicateEntryRows.has(entry.row)) uniqueEntries.push(entry);
}

const newValidStalls = [];
const rejectedEntries = [];
const existingMatches = [];
const potentialUpdates = [];

for (const entry of uniqueEntries) {
  const validationError = isSpamOrInvalid(entry);
  if (validationError) {
    rejectedEntries.push({ row: entry.row, reason: validationError, entry });
    continue;
  }

  if (isDuplicateOfExisting(entry.name, entry.owner, entry.phone)) {
    existingMatches.push({ row: entry.row, reason: 'Duplicate of existing stall', entry });
    continue;
  }

  // Not a match and valid → genuinely new
  newValidStalls.push(entry);
}

// Identify potential update candidates (same stall name, different data)
for (const entry of uniqueEntries) {
  if (existingMatches.some((m) => m.entry.row === entry.row)) continue;
  const normName = normalizeName(entry.name);
  for (const existing of existingStalls) {
    const existingNorm = normalizeName(existing.name);
    if (existingNorm === normName || existingNorm.includes(normName) || normName.includes(existingNorm)) {
      potentialUpdates.push({ existingId: existing.id, existingName: existing.name, newEntry: entry });
      break;
    }
  }
}

// ═══════════════════════════════════════════════════
// 7. SUMMARY
// ═══════════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════');
console.log('  VERIFICATION SUMMARY');
console.log('═══════════════════════════════════════════════\n');

console.log(`Total entries in Excel:         ${rawData.length}`);
console.log(`Duplicate submissions removed:  ${duplicateEntryRows.size}`);
console.log(`Existing matches (already in):  ${existingMatches.length}`);
console.log(`Rejected (invalid/spam):        ${rejectedEntries.length}`);
console.log(`Genuinely new valid stalls:     ${newValidStalls.length}`);

if (newValidStalls.length === 0 && potentialUpdates.length === 0) {
  console.log('\n✅ RESULT: No new valid stalls found. The dataset is already fully synchronized.');
  console.log('✅ stalls.ts does NOT need modification.\n');
} else if (newValidStalls.length === 0 && potentialUpdates.length > 0) {
  console.log(`\n⚠️  ${potentialUpdates.length} existing stall(s) may have updated data in the Excel.`);
  console.log('No entirely new stalls found.\n');
} else {
  console.log(`\n⚠️  ${newValidStalls.length} genuinely new valid stall(s) found in the latest Excel!`);
  newValidStalls.forEach((s, i) => {
    console.log(`  ${i + 1}. "${s.name}" by ${s.owner} (${s.phone}) — ${s.category}`);
  });
}

if (rejectedEntries.length > 0) {
  console.log('\n─── REJECTED / INVALID ENTRIES ───');
  rejectedEntries.forEach((r) => {
    console.log(`  Row ${r.row}: "${r.entry.name}" by ${r.entry.owner} — ${r.reason}`);
  });
}

// Persist result
const output = {
  generatedAt: new Date().toISOString(),
  excelFile: 'Hunar Bazaar 2026 (Responses).xlsx',
  sheet: primarySheetName,
  totalExcelRows: rawData.length,
  existingStallsInDataset: existingStalls.length,
  duplicateSubmissionsRemoved: duplicateEntryRows.size,
  existingMatches: existingMatches.length,
  rejectedInvalid: rejectedEntries.length,
  newValidStalls: newValidStalls.length,
  potentialUpdates: potentialUpdates.length,
  newStalls: newValidStalls.map((s) => ({
    name: s.name,
    owner: s.owner,
    phone: s.phone,
    category: s.category,
    classStr: s.classStr,
    description: s.description,
    priceRange: s.priceRange,
    investment: s.investment,
    requirements: s.requirements,
    team: s.team,
    row: s.row,
    timestamp: s.timestamp,
  })),
  isSynchronized: newValidStalls.length === 0,
};

fs.writeFileSync(
  path.join(__dirname, 'final-sync-result.json'),
  JSON.stringify(output, null, 2)
);
console.log(`\n✅ Full results saved to final-sync-result.json`);
console.log('\n═══════════════════════════════════════════════\n');

