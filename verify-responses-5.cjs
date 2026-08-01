/**
 * Stall Verification Script for Hunar Bazaar 2026 (Responses) (5).xlsx
 * 
 * Compares new Excel data against current stalls.ts (83 stalls)
 * Applies validation rules:
 * - Duplicate detection (name, phone, owner, team)
 * - Spam/test/incomplete filtering
 * - Invalid phone numbers
 * - Earliest timestamp rule for duplicate team submissions
 * - Fuzzy stall name matching
 * 
 * Only appends genuinely new, valid stalls.
 */

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// ──────────────────────────────────────────────────────
// 1. LOAD EXISTING STALLS FROM stalls.ts
// ──────────────────────────────────────────────────────

// These are the 83 existing stalls embedded for comparison
const existingStalls = [
{id:"S-001",name:"Artistry Hub",owner:"Naitik Srivastava",phone:"8382062145"},
{id:"S-002",name:"CD's Co-Creations",owner:"Charu Prajapati",phone:"7897282670"},
{id:"S-003",name:"Clay craze",owner:"Divya Singh",phone:"6257296869"},
{id:"S-004",name:"Craft Carnival",owner:"Anandi Singh",phone:"6306263683"},
{id:"S-005",name:"Crafts cottage or crafty corner",owner:"Janhavi Gupta",phone:"7518001219"},
{id:"S-006",name:"Little Artists",owner:"Arpit yadav",phone:"8160206869"},
{id:"S-007",name:"Pretty Random",owner:"Aditi Singh",phone:"8528761161"},
{id:"S-008",name:"RRRS craft bazar",owner:"Shashank keshari",phone:"6387780257"},
{id:"S-009",name:"Crème Atelier",owner:"Umaima Rais Khan",phone:"8707655375"},
{id:"S-010",name:"Dough And Muff",owner:"Parul Kumari",phone:"7007357427"},
{id:"S-011",name:"Funcakes",owner:"Palak Mishra",phone:"8423074361"},
{id:"S-012",name:"The reders artifact",owner:"Atharv singh",phone:"7233083889"},
{id:"S-013",name:"Banarasi Bhelpuri",owner:"Anuj Kumar Gupta",phone:"7905815423"},
{id:"S-014",name:"BITE & BLOOM",owner:"Shreya Singh",phone:"9220941934"},
{id:"S-015",name:"Bite&Smile",owner:"Akriti Singh",phone:"9792472796"},
{id:"S-016",name:"Bussin' bites",owner:"Hirtika Raghuvanshi",phone:"8004308415"},
{id:"S-017",name:"Food Fiesta",owner:"Anshika Rastogi",phone:"9336647434"},
{id:"S-018",name:"Food Point",owner:"Prabal Pratap Singh",phone:"6307502560"},
{id:"S-019",name:"Food satll",owner:"Roshni rai",phone:"9260903265"},
{id:"S-020",name:"Food stall",owner:"Rudraksh Pratap Singh",phone:"8574153255"},
{id:"S-021",name:"Food stall",owner:"Ayush kumar singh",phone:"9140851913"},
{id:"S-022",name:"Kashi food corner",owner:"Shubh Mishra",phone:"9984011987"},
{id:"S-023",name:"Lottery and Tea stall",owner:"Atul Singh",phone:"7355795190"},
{id:"S-024",name:"Priyanka",owner:"Priyanka gupta",phone:"8188020099"},
{id:"S-025",name:"Snack attack",owner:"Himanshi pandey",phone:"9123925258"},
{id:"S-026",name:"Aim Shooter",owner:"Shashwat Singh",phone:"9208495159"},
{id:"S-027",name:"Creative gaming",owner:"Viraj Singh",phone:"638729265"},
{id:"S-028",name:"Game and activities stall",owner:"Dhananjay pandey",phone:"7985233882"},
{id:"S-029",name:"Game Galaxy",owner:"Angel Singh",phone:"7651995121"},
{id:"S-030",name:"Loot lo club",owner:"Reyansh tiwari",phone:"9120297641"},
{id:"S-031",name:"Mysterious Goal Challenge",owner:"Adirya Srivastava",phone:"9795776988"},
{id:"S-032",name:"Mystery Scan and Fortune Wheel",owner:"Samar Bahadur Singh",phone:"6307565070"},
{id:"S-033",name:"Mystic Arcade 🪩",owner:"Vidhi Gupta",phone:"7355401323"},
{id:"S-034",name:"Shoot Master",owner:"Raj yadav",phone:"7275983956"},
{id:"S-035",name:"Sniper Shooting",owner:"Ayank Pratap Singh",phone:"8795536786"},
{id:"S-036",name:"The Salers",owner:"Gautam Kumar",phone:"8757011937"},
{id:"S-037",name:"To provide student with entertainment...",owner:"Sarthak singh",phone:"9336263134"},
{id:"S-038",name:"VICTORY ARENA",owner:"Shivam Jaiswal",phone:"9569545289"},
{id:"S-039",name:"The Cozy Creating Creations",owner:"Akriti Pal",phone:"9336937450"},
{id:"S-040",name:"Charms and craft",owner:"Stuti",phone:"6307720637"},
{id:"S-041",name:"2 good 2 go",owner:"Anandi Dubey",phone:"6307205670"},
{id:"S-042",name:"Lucky 16",owner:"Naitik Singh",phone:"9140805605"},
{id:"S-043",name:"Swad-e-banaras",owner:"Grasy Shahi",phone:"8707673810"},
{id:"S-044",name:"Flavour fusion",owner:"Aparna mishra",phone:"7310150372"},
{id:"S-045",name:"Fun Fusion",owner:"Kavya yadav",phone:"8303197887"},
{id:"S-046",name:"Fortune Frenzy",owner:"Ayush Agrawal",phone:"9569197565"},
{id:"S-047",name:"Moodboard",owner:"Vaani Srivastava",phone:"8604390878"},
{id:"S-048",name:"Game zone",owner:"Tanishka Srivastava",phone:"9511024925"},
{id:"S-049",name:"Wok & whirl",owner:"Trisha Tiwari",phone:"8957882425"},
{id:"S-050",name:"Team Hunar Bazaar",owner:"Neelam Singh (Principal)",phone:"9452566818"},
{id:"S-051",name:"The Cozy Creations",owner:"Adhishree Srivastava",phone:"7985844561"},
{id:"S-052",name:"TRY DELICIOUS FOOD",owner:"Abhinav Singh",phone:"9140136699"},
{id:"S-053",name:"Top level gamers",owner:"Dev Raghuvanshi",phone:"8528289192"},
{id:"S-054",name:"Take Me Home!",owner:"Aradhya singh",phone:"6394347968"},
{id:"S-055",name:"Floral vibe",owner:"Amrita singh",phone:"9452787768"},
{id:"S-056",name:"The Crafty Corner",owner:"Prince Patel",phone:"7860171147"},
{id:"S-057",name:"Gen -z stall",owner:"Akshara Singh",phone:"9453139323"},
{id:"S-058",name:"The chatori junction",owner:"Iksha Upadhyay",phone:"6390801603"},
{id:"S-059",name:"~Papdi paradise~",owner:"Archana chauhan",phone:"8922985557"},
{id:"S-060",name:"Mehfil-e-hunar",owner:"Rida Ekbal",phone:"9984770888"},
{id:"S-061",name:"Act On Craft",owner:"Kriti Srivastava",phone:"8618259326"},
{id:"S-062",name:"Fun zone",owner:"Yashraj Singh Raghuvanshi",phone:"9792140474"},
{id:"S-063",name:"Double A artworks",owner:"Arunav Kumar",phone:"9452168707"},
{id:"S-064",name:"The Cheesy Slice",owner:"Atharva Garg",phone:"7266011134"},
{id:"S-065",name:"Crafty corner",owner:"Aditi Singh",phone:"9569847205"},
{id:"S-066",name:"Offbeat",owner:"Prabhav Singh",phone:"7398226377"},
{id:"S-067",name:"Rakhi mela",owner:"Shubh agarwal",phone:"8299749123"},
{id:"S-068",name:"Yum Junction",owner:"Yash Kumar Srivastava",phone:"7839347226"},
{id:"S-069",name:"The Aiming Mastery Game",owner:"Divyansh Rai",phone:"8052334455"},
{id:"S-070",name:"Kingster Kingdom",owner:"Shreyansh Sashwat",phone:"9305587096"},
{id:"S-071",name:"Art and craft",owner:"Vaibhavi Srivastava",phone:"9140474840"},
{id:"S-072",name:"We COOKED",owner:"Shreya Singh",phone:"9450872224"},
{id:"S-073",name:"Frosted Brews",owner:"Aditya Raj Singh",phone:"9214628254"},
{id:"S-074",name:"The Clean canvas",owner:"Nabya Singh",phone:"9161731528"},
{id:"S-075",name:"Sketch & Smile",owner:"Akshya yadav",phone:"7652003241"},
{id:"S-076",name:"Brain Blitz",owner:"Adya rai",phone:"8840255947"},
{id:"S-077",name:"Fun Fiesta",owner:"Kritika Srivastava",phone:"9919414296"},
{id:"S-078",name:"The munch corner",owner:"Jyotsana singh",phone:"7355033983"},
{id:"S-079",name:"U.P college ka prasidh lal peda",owner:"Anshuman kumar",phone:"8400390307"},
{id:"S-080",name:"The Happy Cart 😊",owner:"Aditya singh",phone:"9559801802"},
{id:"S-081",name:"Fun Zone Arena",owner:"Kritika Gupta",phone:"9336931873"},
{id:"S-082",name:"Campus Cravings",owner:"yuvraj keshari",phone:"7376641041"},
{id:"S-083",name:"Morimono Market",owner:"Megha",phone:"6396435179"}
];

// Build lookup maps
const existingNameSet = new Set(existingStalls.map(s => normalizeName(s.name)));
const existingPhoneSet = new Set(existingStalls.map(s => normalizePhone(s.phone)));
const existingOwnerSet = new Set(existingStalls.map(s => normalizeOwner(s.owner)));

// ──────────────────────────────────────────────────────
// 2. HELPER FUNCTIONS
// ──────────────────────────────────────────────────────

function normalizeName(name) {
  return name.toString().toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeOwner(owner) {
  return owner.toString().toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizePhone(phone) {
  if (!phone) return '';
  return String(phone).replace(/[^0-9]/g, '').slice(-10);
}

function normalizeCategory(cat) {
  // Remove emoji prefix and trim
  return cat.replace(/[^\w\s&,-]/g, '').trim();
}

function isSpamOrInvalid(entry) {
  const name = (entry.name || '').toString().trim();
  const owner = (entry.owner || '').toString().trim();
  const phone = entry.phone;
  const category = (entry.category || '').toString().trim();
  const description = (entry.description || '').toString().toLowerCase().trim();
  const ownerLower = owner.toLowerCase();

  // Empty/incomplete checks
  if (!name || name.length < 2) return 'Stall name too short or empty';
  if (!owner || owner.length < 2) return 'Owner name too short or empty';
  
  // Phone validation
  if (!phone || phone.length < 10) return `Invalid phone number: "${entry.rawPhone || phone}"`;
  
  // Category check
  if (!category || category.length < 2) return 'Missing category';

  // Spam keywords check
  const spamNames = ['test', 'abc', 'xyz', 'asdf', 'qwerty', 'admin', 'user', 'demo', 'sample', 'null', 'undefined', 'na', 'n/a', 'none', 'nil', 'spam', 'dummy', 'fake', 'abcd', 'asdfgh', 'testing'];
  if (spamNames.some(s => ownerLower.includes(s)) && ownerLower.length < 10) {
    return 'Spam/test name detected';
  }

  // Test descriptions
  if ((description.includes('test') || description.includes('demo')) && description.length < 30 && ownerLower.includes('test')) {
    return 'Test/invalid description';
  }

  // Gibberish name check
  const alphaRatio = (name.replace(/[^a-zA-Z]/g, '').length) / Math.max(name.length, 1);
  if (alphaRatio < 0.3 && name.length > 3 && owner.length < 5) return 'Gibberish name';

  return null; // Valid
}

function isDuplicateOfExisting(name, owner, phone) {
  const normName = normalizeName(name);
  const normOwner = normalizeOwner(owner);
  const normPhone = normalizePhone(phone);

  // Check exact name match
  for (const existingName of existingNameSet) {
    if (existingName === normName) return true;
    // Check if one contains the other (longer than 5 chars)
    if (normName.length >= 5 && existingName.includes(normName)) return true;
    if (existingName.length >= 5 && normName.includes(existingName)) return true;
  }

  // Check phone match
  if (normPhone && normPhone.length >= 10 && existingPhoneSet.has(normPhone)) return true;

  // Check owner match
  for (const existingOwner of existingOwnerSet) {
    if (existingOwner === normOwner) return true;
    if (normOwner.length >= 5 && existingOwner.includes(normOwner)) return true;
    if (existingOwner.length >= 5 && normOwner.includes(existingOwner)) return true;
  }

  return false;
}

// ──────────────────────────────────────────────────────
// 3. LOAD EXCEL
// ──────────────────────────────────────────────────────

const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses) (5).xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });

console.log('═══════════════════════════════════════════════');
console.log('  HUNAR BAZAAR 2026 — STALL VERIFICATION v5');
console.log('═══════════════════════════════════════════════\n');

const headers = Object.keys(rawData[0] || {});
console.log(`Excel file: Hunar Bazaar 2026 (Responses) (5).xlsx`);
console.log(`Sheet: "${sheetName}"`);
console.log(`Total rows in Excel: ${rawData.length}`);
console.log(`Existing stalls in stalls.ts: ${existingStalls.length}\n`);

// Map column names
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
const colName = findColumn(['stall name', 'proposed stall', 'stall']) || headers.find((h,i) => i === 7) || headers[7];
const colOwner = findColumn(['your name', 'enter your name']) || headers[1];
const colClass = findColumn(['your class', 'enter your class', 'class']) || headers[2];
const colSection = findColumn(['section']) || headers[3];
const colPhone = findColumn(['contact', 'phone', 'number']) || headers[4];
const colTeam = findColumn(['team member', 'member details']) || headers[6];
const colCategory = findColumn(['category', 'stall category']) || headers[8];
const colDescription = findColumn(['description', 'brief']) || headers[9];
const colPrice = findColumn(['price range']) || headers[10];
const colInvestment = findColumn(['investment']) || headers[11];
const colRequirements = findColumn(['requirement']) || headers[12];

console.log('Column mapping:');
console.log(`  Timestamp: "${colTimestamp}"`);
console.log(`  Name: "${colName}"`);
console.log(`  Owner: "${colOwner}"`);
console.log(`  Phone: "${colPhone}"`);
console.log(`  Category: "${colCategory}"`);

// ──────────────────────────────────────────────────────
// 4. PARSE ALL ENTRIES
// ──────────────────────────────────────────────────────

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

// ──────────────────────────────────────────────────────
// 5. DETECT DUPLICATE TEAM SUBMISSIONS (Within Excel)
// ──────────────────────────────────────────────────────

const teamGroups = new Map();
for (const entry of parsed) {
  // Use phone + name + owner as unique key
  const key = `${entry.phone}_${normalizeName(entry.name)}_${normalizeOwner(entry.owner)}`;
  if (!teamGroups.has(key)) {
    teamGroups.set(key, []);
  }
  teamGroups.get(key).push(entry);
}

// Also group by phone number alone (same person may submit similar stalls)
const phoneGroups = new Map();
for (const entry of parsed) {
  if (entry.phone && entry.phone.length >= 10) {
    if (!phoneGroups.has(entry.phone)) {
      phoneGroups.set(entry.phone, []);
    }
    phoneGroups.get(entry.phone).push(entry);
  }
}

const duplicateEntryRows = new Set();
const earliestEntries = new Map();

// Process exact match groups
for (const [key, entries] of teamGroups) {
  if (entries.length > 1) {
    entries.sort((a, b) => {
      const ta = typeof a.rawTimestamp === 'number' ? a.rawTimestamp : 0;
      const tb = typeof b.rawTimestamp === 'number' ? b.rawTimestamp : 0;
      return ta - tb;
    });
    const earliest = entries[0];
    earliestEntries.set(key, earliest);
    for (let j = 1; j < entries.length; j++) {
      duplicateEntryRows.add(entries[j].row);
      console.log(`⚠️  DUPLICATE Row ${entries[j].row}: "${entries[j].name}" by ${entries[j].owner} (later timestamp)`);
      console.log(`   → Earliest: Row ${entries[0].row} (Timestamp: ${entries[0].rawTimestamp})`);
    }
  } else {
    earliestEntries.set(key, entries[0]);
  }
}

// Process phone groups for similar stall names
for (const [phone, entries] of phoneGroups) {
  if (entries.length > 1) {
    // Check if any have very similar names
    const normalizedNames = entries.map(e => normalizeName(e.name));
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const ni = normalizedNames[i];
        const nj = normalizedNames[j];
        const isSimilar = ni === nj || (ni.includes(nj) && nj.length >= 4) || (nj.includes(ni) && ni.length >= 4);
        if (isSimilar) {
          // These are duplicate submissions - keep earliest
          const sorted = [entries[i], entries[j]].sort((a, b) => {
            const ta = typeof a.rawTimestamp === 'number' ? a.rawTimestamp : 0;
            const tb = typeof b.rawTimestamp === 'number' ? b.rawTimestamp : 0;
            return ta - tb;
          });
          const laterEntry = sorted[1];
          if (!duplicateEntryRows.has(laterEntry.row)) {
            duplicateEntryRows.add(laterEntry.row);
            console.log(`⚠️  DUPLICATE (same phone, similar name) Row ${laterEntry.row}: "${laterEntry.name}" by ${laterEntry.owner}`);
            console.log(`   → Earliest: Row ${sorted[0].row} "${sorted[0].name}" (Timestamp: ${sorted[0].rawTimestamp})`);
          }
        }
      }
    }
  }
}

// ──────────────────────────────────────────────────────
// 6. VALIDATE EACH UNIQUE ENTRY
// ──────────────────────────────────────────────────────

console.log('\n─── ENTRY VALIDATION ───\n');

const uniqueEntries = [];
for (const entry of earliestEntries.values()) {
  if (!duplicateEntryRows.has(entry.row)) {
    uniqueEntries.push(entry);
  }
}

const newValidStalls = [];
const rejectedEntries = [];

for (const entry of uniqueEntries) {
  // First check if duplicate of existing stalls
  if (isDuplicateOfExisting(entry.name, entry.owner, entry.phone)) {
    console.log(`❌ Row ${entry.row}: "${entry.name}" by ${entry.owner} — DUPLICATE (already in stalls.ts)`);
    rejectedEntries.push({ row: entry.row, reason: 'DUPLICATE in existing data', entry });
    continue;
  }

  // Then validate
  const validationError = isSpamOrInvalid(entry);
  if (validationError) {
    console.log(`❌ Row ${entry.row}: "${entry.name}" by ${entry.owner} — ${validationError}`);
    rejectedEntries.push({ row: entry.row, reason: validationError, entry });
    continue;
  }

  // It's a genuinely new valid stall!
  console.log(`✅ Row ${entry.row}: "${entry.name}" by ${entry.owner} (${entry.category}) — NEW ✓`);
  newValidStalls.push(entry);
}

// ──────────────────────────────────────────────────────
// 7. SUMMARY
// ──────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════');
console.log('  VERIFICATION SUMMARY');
console.log('═══════════════════════════════════════════════\n');

console.log(`Total entries in Excel:       ${rawData.length}`);
console.log(`Duplicate within Excel:       ${duplicateEntryRows.size}`);
console.log(`Rejected (invalid/spam/dup):  ${rejectedEntries.length}`);
console.log(`New valid stalls found:       ${newValidStalls.length}`);

if (newValidStalls.length === 0) {
  console.log('\n✅ RESULT: No new valid stalls found. The dataset is already fully synchronized.');
  console.log('✅ stalls.ts does NOT need modification.\n');
} else {
  console.log(`\n⚠️  RESULT: ${newValidStalls.length} new valid stall(s) found!`);
  console.log('These can be appended to stalls.ts.\n');
  console.log('─── NEW STALLS DATA ───\n');
  console.log(JSON.stringify(newValidStalls, null, 2));
}

console.log('\n─── EARLIEST TIMESTAMP RULE ───');
console.log(`Applied ✓ (${duplicateEntryRows.size} later duplicate submissions removed)`);

// Generate output file
if (newValidStalls.length > 0) {
  fs.writeFileSync(
    path.join(__dirname, 'new-stalls-v5.json'),
    JSON.stringify({ newEntries: newValidStalls, generatedAt: new Date().toISOString(), totalNew: newValidStalls.length }, null, 2)
  );
  console.log(`\n✅ New stalls data saved to new-stalls-v5.json`);
}

console.log('\n═══════════════════════════════════════════════\n');

