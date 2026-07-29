/**
 * Stall Comparison Script
 * 
 * Parses Hunar Bazaar 2026 (Responses) (4).xlsx
 * Compares against current stalls.ts (79 stalls)
 * Applies validation rules, duplicate detection, team timestamp rule
 * Outputs genuinely new valid stalls
 */

const xlsx = require('xlsx');
const path = require('path');

// ── Load existing stalls data ──
// We embed a simple reference of existing stall owners, names, phones for comparison
const existingStalls = [
  // S-001 to S-079 from stalls.ts
  { id: "S-001", name: "Artistry Hub", owner: "Naitik Srivastava", phone: "8382062145" },
  { id: "S-002", name: "CD's Co-Creations", owner: "Charu Prajapati", phone: "7897282670" },
  { id: "S-003", name: "Clay craze", owner: "Divya Singh", phone: "6257296869" },
  { id: "S-004", name: "Craft Carnival", owner: "Anandi Singh", phone: "6306263683" },
  { id: "S-005", name: "Crafts cottage or crafty corner", owner: "Janhavi Gupta", phone: "7518001219" },
  { id: "S-006", name: "Little Artists", owner: "Arpit yadav", phone: "8160206869" },
  { id: "S-007", name: "Pretty Random", owner: "Aditi Singh", phone: "8528761161" },
  { id: "S-008", name: "RRRS craft bazar", owner: "Shashank keshari", phone: "6387780257" },
  { id: "S-009", name: "Crème Atelier", owner: "Umaima Rais Khan", phone: "8707655375" },
  { id: "S-010", name: "Dough And Muff", owner: "Parul Kumari", phone: "7007357427" },
  { id: "S-011", name: "Funcakes", owner: "Palak Mishra", phone: "8423074361" },
  { id: "S-012", name: "The reders artifact", owner: "Atharv singh", phone: "7233083889" },
  { id: "S-013", name: "Banarasi Bhelpuri", owner: "Anuj Kumar Gupta", phone: "7905815423" },
  { id: "S-014", name: "BITE & BLOOM", owner: "Shreya Singh", phone: "9220941934" },
  { id: "S-015", name: "Bite&Smile", owner: "Akriti Singh", phone: "9792472796" },
  { id: "S-016", name: "Bussin' bites", owner: "Hirtika Raghuvanshi", phone: "8004308415" },
  { id: "S-017", name: "Food Fiesta", owner: "Anshika Rastogi", phone: "9336647434" },
  { id: "S-018", name: "Food Point", owner: "Prabal Pratap Singh", phone: "6307502560" },
  { id: "S-019", name: "Food satll", owner: "Roshni rai", phone: "9260903265" },
  { id: "S-020", name: "Food stall", owner: "Rudraksh Pratap Singh", phone: "8574153255" },
  { id: "S-021", name: "Food stall", owner: "Ayush kumar singh", phone: "9140851913" },
  { id: "S-022", name: "Kashi food corner", owner: "Shubh Mishra", phone: "9984011987" },
  { id: "S-023", name: "Lottery and Tea stall", owner: "Atul Singh", phone: "7355795190" },
  { id: "S-024", name: "Priyanka", owner: "Priyanka gupta", phone: "8188020099" },
  { id: "S-025", name: "Snack attack", owner: "Himanshi pandey", phone: "9123925258" },
  { id: "S-026", name: "Aim Shooter", owner: "Shashwat Singh", phone: "9208495159" },
  { id: "S-027", name: "Creative gaming", owner: "Viraj Singh", phone: "638729265" },
  { id: "S-028", name: "Game and activities stall", owner: "Dhananjay pandey", phone: "7985233882" },
  { id: "S-029", name: "Game Galaxy", owner: "Angel Singh", phone: "7651995121" },
  { id: "S-030", name: "Loot lo club", owner: "Reyansh tiwari", phone: "9120297641" },
  { id: "S-031", name: "Mysterious Goal Challenge", owner: "Adirya Srivastava", phone: "9795776988" },
  { id: "S-032", name: "Mystery Scan and Fortune Wheel", owner: "Samar Bahadur Singh", phone: "6307565070" },
  { id: "S-033", name: "Mystic Arcade 🪩", owner: "Vidhi Gupta", phone: "7355401323" },
  { id: "S-034", name: "Shoot Master", owner: "Raj yadav", phone: "7275983956" },
  { id: "S-035", name: "Sniper Shooting", owner: "Ayank Pratap Singh", phone: "8795536786" },
  { id: "S-036", name: "The Salers", owner: "Gautam Kumar", phone: "8757011937" },
  { id: "S-037", name: "To provide student with entertainment...", owner: "Sarthak singh", phone: "9336263134" },
  { id: "S-038", name: "VICTORY ARENA", owner: "Shivam Jaiswal", phone: "9569545289" },
  { id: "S-039", name: "The Cozy Creating Creations", owner: "Akriti Pal", phone: "9336937450" },
  { id: "S-040", name: "Charms and craft", owner: "Stuti", phone: "6307720637" },
  { id: "S-041", name: "2 good 2 go", owner: "Anandi Dubey", phone: "6307205670" },
  { id: "S-042", name: "Lucky 16", owner: "Naitik Singh", phone: "9140805605" },
  { id: "S-043", name: "Swad-e-banaras", owner: "Grasy Shahi", phone: "8707673810" },
  { id: "S-044", name: "Flavour fusion", owner: "Aparna mishra", phone: "7310150372" },
  { id: "S-045", name: "Fun Fusion", owner: "Kavya yadav", phone: "8303197887" },
  { id: "S-046", name: "Fortune Frenzy", owner: "Ayush Agrawal", phone: "9569197565" },
  { id: "S-047", name: "Moodboard", owner: "Vaani Srivastava", phone: "8604390878" },
  { id: "S-048", name: "Game zone", owner: "Tanishka Srivastava", phone: "9511024925" },
  { id: "S-049", name: "Wok & whirl", owner: "Trisha Tiwari", phone: "8957882425" },
  { id: "S-050", name: "Team Hunar Bazaar", owner: "Neelam Singh (Principal)", phone: "9452566818" },
  { id: "S-051", name: "The Cozy Creations", owner: "Adhishree Srivastava", phone: "7985844561" },
  { id: "S-052", name: "TRY DELICIOUS FOOD", owner: "Abhinav Singh", phone: "9140136699" },
  { id: "S-053", name: "Top level gamers", owner: "Dev Raghuvanshi", phone: "8528289192" },
  { id: "S-054", name: "Take Me Home!", owner: "Aradhya singh", phone: "6394347968" },
  { id: "S-055", name: "Floral vibe", owner: "Amrita singh", phone: "9452787768" },
  { id: "S-056", name: "The Crafty Corner", owner: "Prince Patel", phone: "7860171147" },
  { id: "S-057", name: "Gen -z stall", owner: "Akshara Singh", phone: "9453139323" },
  { id: "S-058", name: "The chatori junction", owner: "Iksha Upadhyay", phone: "6390801603" },
  { id: "S-059", name: "~Papdi paradise~", owner: "Archana chauhan", phone: "8922985557" },
  { id: "S-060", name: "Mehfil-e-hunar", owner: "Rida Ekbal", phone: "9984770888" },
  { id: "S-061", name: "Act On Craft", owner: "Kriti Srivastava", phone: "8618259326" },
  { id: "S-062", name: "Fun zone", owner: "Yashraj Singh Raghuvanshi", phone: "9792140474" },
  { id: "S-063", name: "Double A artworks", owner: "Arunav Kumar", phone: "9452168707" },
  { id: "S-064", name: "The Cheesy Slice", owner: "Atharva Garg", phone: "7266011134" },
  { id: "S-065", name: "Crafty corner", owner: "Aditi Singh", phone: "9569847205" },
  { id: "S-066", name: "Offbeat", owner: "Prabhav Singh", phone: "7398226377" },
  { id: "S-067", name: "Rakhi mela", owner: "Shubh agarwal", phone: "8299749123" },
  { id: "S-068", name: "Yum Junction", owner: "Yash Kumar Srivastava", phone: "7839347226" },
  { id: "S-069", name: "The Aiming Mastery Game", owner: "Divyansh Rai", phone: "8052334455" },
  { id: "S-070", name: "Kingster Kingdom", owner: "Shreyansh Sashwat", phone: "9305587096" },
  { id: "S-071", name: "Art and craft", owner: "Vaibhavi Srivastava", phone: "9140474840" },
  { id: "S-072", name: "We COOKED", owner: "Shreya Singh", phone: "9450872224" },
  { id: "S-073", name: "Frosted Brews", owner: "Aditya Raj Singh", phone: "9214628254" },
  { id: "S-074", name: "The Clean canvas", owner: "Nabya Singh", phone: "9161731528" },
  { id: "S-075", name: "Sketch & Smile", owner: "Akshya yadav", phone: "7652003241" },
  { id: "S-076", name: "Brain Blitz", owner: "Adya rai", phone: "8840255947" },
  { id: "S-077", name: "Fun Fiesta", owner: "Kritika Srivastava", phone: "9919414296" },
  { id: "S-078", name: "The munch corner", owner: "Jyotsana singh", phone: "7355033983" },
  { id: "S-079", name: "U.P college ka prasidh lal peda", owner: "Anshuman kumar", phone: "8400390307" }
];

// Build lookup maps for quick comparison
const existingNames = new Map(existingStalls.map(s => [s.name.toLowerCase().trim(), s]));
const existingOwners = new Map(existingStalls.map(s => [s.owner.toLowerCase().trim(), s]));
const existingPhones = new Map(existingStalls.map(s => {
  // Normalize phone numbers
  const phone = String(s.phone).replace(/[^0-9]/g, '').slice(-10);
  return [phone, s];
}));

// ── Load the 4th Excel ──
const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses) (4).xlsx');
const workbook = xlsx.readFile(filePath);

console.log('=== HUNAR BAZAAR 2026 — STALL VERIFICATION ===');
console.log(`Sheet Names: ${JSON.stringify(workbook.SheetNames)}`);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });

console.log(`Total rows in Excel: ${rawData.length}`);

// Get headers
const headers = Object.keys(rawData[0] || {});
console.log('\nHeaders:');
headers.forEach((h, i) => console.log(`${i + 1}. "${h}"`));

// ── Map column names (flexible) ──
function findColumn(keywords) {
  for (const h of headers) {
    for (const kw of keywords) {
      if (h.toLowerCase().includes(kw)) return h;
    }
  }
  return null;
}

const colName = findColumn(['stall name', 'proposed stall', 'stall']) || headers[7];
const colOwner = findColumn(['your name', 'enter your name', 'name']) || headers[1];
const colClass = findColumn(['class', 'your class', 'enter your class']) || headers[2];
const colSection = findColumn(['section', 'your section', 'enter your section']) || headers[3];
const colPhone = findColumn(['contact', 'phone', 'number', 'mobile']) || headers[4];
const colTeam = findColumn(['team', 'member']) || headers[6];
const colCategory = findColumn(['category', 'stall category']) || headers[8];
const colDescription = findColumn(['description', 'describe', 'brief']) || headers[9];
const colPrice = findColumn(['price', 'range']) || headers[10];
const colInvestment = findColumn(['investment']) || headers[11];
const colRequirements = findColumn(['requirement', 'any requirement']) || headers[12];
const colTimestamp = findColumn(['timestamp', 'time']) || headers[0];

console.log('\n=== COLUMN MAPPING ===');
console.log(`Timestamp: "${colTimestamp}"`);
console.log(`Name: "${colName}"`);
console.log(`Owner: "${colOwner}"`);
console.log(`Class: "${colClass}"`);
console.log(`Section: "${colSection}"`);
console.log(`Phone: "${colPhone}"`);
console.log(`Team: "${colTeam}"`);
console.log(`Category: "${colCategory}"`);
console.log(`Description: "${colDescription}"`);
console.log(`Price: "${colPrice}"`);
console.log(`Investment: "${colInvestment}"`);
console.log(`Requirements: "${colRequirements}"`);

// ── Parse & validate entries ──
function normalizePhone(phone) {
  if (!phone) return '';
  return String(phone).replace(/[^0-9]/g, '').slice(-10);
}

function normalizeForComparison(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isSpamOrInvalid(entry) {
  const rawName = (entry[colName] || '').toString().trim();
  const name = rawName.toLowerCase();
  const owner = (entry[colOwner] || '').toString().trim();
  const ownerLower = owner.toLowerCase();
  const desc = (entry[colDescription] || '').toString().toLowerCase().trim();
  const phone = normalizePhone(entry[colPhone]);
  const category = (entry[colCategory] || '').toString().toLowerCase().trim();
  const classStr = (entry[colClass] || '').toString().trim();
  const section = (entry[colSection] || '').toString().trim();

  // ===== FIRST: DUPLICATE DETECTION (check against existing 79 stalls) =====
  const normName = normalizeForComparison(rawName);
  
  // 1a. Check by normalized name against existing stalls (fuzzy)
  for (const stall of existingStalls) {
    const existingNorm = normalizeForComparison(stall.name);
    if (existingNorm === normName || 
        (existingNorm.includes(normName) && normName.length >= 4) || 
        (normName.includes(existingNorm) && existingNorm.length >= 4)) {
      return `DUPLICATE (matches existing "${stall.id}": "${stall.name}" by ${stall.owner})`;
    }
  }

  // 1b. Check by phone number
  if (existingPhones.has(phone)) {
    const existing = existingPhones.get(phone);
    return `DUPLICATE by phone (matches "${existing.id}": "${existing.name}")`;
  }

  // 1c. Check by owner name (fuzzy)
  const ownerNorm = ownerLower.replace(/\s+/g, ' ').trim();
  for (const [existingOwnerRaw, stall] of existingOwners) {
    const existingOwnerNorm = existingOwnerRaw.replace(/\s+/g, ' ').trim();
    if (existingOwnerNorm === ownerNorm || 
        (existingOwnerNorm.includes(ownerNorm) && ownerNorm.length > 4) || 
        (ownerNorm.includes(existingOwnerNorm) && existingOwnerNorm.length > 4)) {
      return `DUPLICATE by owner (matches "${stall.id}": "${stall.name}")`;
    }
  }

  // Now that we've confirmed it's NOT a duplicate, do validation checks
  
  // Check for spam/test names
  const spamNames = ['test', 'abc', 'xyz', 'asdf', 'qwerty', 'admin', 'user', 'demo', 'sample', 'random', 'null', 'undefined', 'na', 'n/a', 'none', 'nil', 'test user', 'test entry', 'testing', 'spam', 'dummy', 'fake', 'abcd', 'asdfgh'];
  if (spamNames.some(s => ownerLower.includes(s)) && ownerLower.length < 10) {
    return `Spam/test name detected`;
  }

  // Check for incomplete entries - use raw string length
  if (!rawName || rawName.length < 2) return 'Stall name too short or empty';
  if (!owner || owner.length < 3) return 'Owner name too short or empty';
  if (!phone || phone.length < 10) return `Invalid phone number: "${entry[colPhone]}"`;
  if (!category || category.length < 2) return 'Missing category';

  // Check for illogical/inconsistent entries
  if ((desc.includes('test') || desc.includes('demo')) && desc.length < 30 && ownerLower.includes('test')) return 'Test/invalid description';
  
  // Check for very high investment amounts (likely random)
  const investStr = String(entry[colInvestment]).replace(/[^0-9.]/g, '');
  const invest = parseFloat(investStr);
  if (!isNaN(invest) && invest > 50000) return `Suspicious investment amount: ₹${invest}`;

  // Check for random gibberish names
  const alphaRatio = (rawName.match(/[a-zA-Z]/g) || []).length / Math.max(rawName.length, 1);
  if (alphaRatio < 0.3 && rawName.length > 3 && owner.length < 5) return 'Gibberish name';

  return null; // Entry is valid and new
}

// ── Parse all entries ──
const parsed = [];

for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i];
  const timestamp = row[colTimestamp];
  const name = (row[colName] || '').toString().trim();
  const owner = (row[colOwner] || '').toString().trim();
  const classRaw = (row[colClass] || '').toString().trim();
  const section = (row[colSection] || '').toString().trim();
  const phone = normalizePhone(row[colPhone]);
  const team = (row[colTeam] || '').toString().trim();
  const category = (row[colCategory] || '').toString().trim();
  const description = (row[colDescription] || '').toString().trim();
  const price = (row[colPrice] || '').toString().trim();
  const investment = (row[colInvestment] || '').toString().trim();
  const requirements = (row[colRequirements] || '').toString().trim();

  // Build classStr
  let classStr = classRaw;
  if (section && !classStr.includes(section)) {
    classStr = classStr + ' ' + section;
  }

  parsed.push({
    row: i + 1,
    timestamp,
    name,
    owner,
    classStr: classStr.trim(),
    phone,
    category,
    team,
    description,
    priceRange: price,
    investment,
    requirements,
    rawTimestamp: timestamp, // Excel serial date number
  });
}

// ── Detect duplicate team submissions ──
// Group by team members (normalized)
const teamGroups = new Map();

for (const entry of parsed) {
  const teamKey = entry.team.replace(/\s+/g, ' ').trim().toLowerCase();
  const phoneKey = entry.phone;
  const nameKey = entry.name.toLowerCase().trim();
  
  // Use combination of phone + name as unique identifier
  const key = `${entry.phone}_${nameKey}`;
  
  if (!teamGroups.has(key)) {
    teamGroups.set(key, []);
  }
  teamGroups.get(key).push(entry);
}

// For each group, keep the earliest timestamp submission
const duplicateEntries = new Set();
const earliestEntries = new Map();

for (const [key, entries] of teamGroups) {
  if (entries.length > 1) {
    // Sort by timestamp - earlier is older (lower serial number = earlier date)
    entries.sort((a, b) => {
      const ta = typeof a.rawTimestamp === 'number' ? a.rawTimestamp : 0;
      const tb = typeof b.rawTimestamp === 'number' ? b.rawTimestamp : 0;
      return ta - tb;
    });
    
    // Keep the earliest
    const earliest = entries[0];
    earliestEntries.set(key, earliest);
    
    // Mark all others as duplicates
    for (let j = 1; j < entries.length; j++) {
      duplicateEntries.add(entries[j].row);
      console.log(`\n⚠️  DUPLICATE TEAM SUBMISSION (Row ${entries[j].row}): "${entries[j].name}" by ${entries[j].owner}`);
      console.log(`   → Earliest is Row ${entries[j-1].row} (Timestamp: ${entries[j-1].rawTimestamp})`);
    }
  } else {
    earliestEntries.set(key, entries[0]);
  }
}

// ── Validate each unique entry ──
console.log('\n\n=== ENTRY VALIDATION ===\n');

const newValidStalls = [];
const duplicateOrInvalid = [];

for (const entry of earliestEntries.values()) {
  const result = isSpamOrInvalid(entry);
  
  if (result) {
    console.log(`❌ Row ${entry.row}: "${entry.name}" by ${entry.owner} → ${result}`);
    duplicateOrInvalid.push({ row: entry.row, reason: result, entry });
  } else {
    console.log(`✅ Row ${entry.row}: "${entry.name}" by ${entry.owner} — NEW VALID STALL`);
    newValidStalls.push(entry);
  }
}

// ── Summary ──
console.log('\n\n=== VERIFICATION SUMMARY ===');
console.log(`Total entries in Excel: ${rawData.length}`);
console.log(`Duplicate team submissions removed: ${duplicateEntries.size}`);
console.log(`Invalid/spam/test entries: ${duplicateOrInvalid.length}`);
console.log(`Genuinely new valid stalls found: ${newValidStalls.length}`);

if (newValidStalls.length === 0) {
  console.log('\n✅ RESULT: No new valid stalls found. The dataset is already up to date.');
  console.log('✅ Current stall data (79 stalls) is fully synchronized with the latest Excel.');
} else {
  console.log(`\n⚠️  RESULT: ${newValidStalls.length} new stall(s) found. Prepare to append to stalls.ts.`);
  console.log('\n--- NEW STALLS DATA ---\n');
  console.log(JSON.stringify(newValidStalls, null, 2));
}

// Print final summary
console.log('\n\n=== FINAL REPORT ===');
console.log(`1. Total existing stalls: ${existingStalls.length}`);
console.log(`2. Excel entries analyzed: ${rawData.length}`);
console.log(`3. Duplicate submissions (within Excel): ${duplicateEntries.size}`);
console.log(`4. Invalid/spam/test entries: ${duplicateOrInvalid.length}`);
console.log(`5. New valid stalls to add: ${newValidStalls.length}`);
console.log(`6. Earliest timestamp rule: APPLIED ✓`);
if (newValidStalls.length > 0) {
  console.log('7. Dataset status: NEEDS UPDATE');
} else {
  console.log('7. Dataset status: ✅ UP TO DATE');
}

