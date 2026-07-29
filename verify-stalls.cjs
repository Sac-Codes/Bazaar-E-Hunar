/**
 * Quick Stall Verification Script
 * Parses 4th Excel, compares against current 79 stalls
 * Outputs any genuinely new entries not in the existing dataset
 */

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// ── Load existing stall identifiers ──
const existingNames = [
  "Artistry Hub","CD's Co-Creations","Clay craze","Craft Carnival","Crafts cottage or crafty corner",
  "Little Artists","Pretty Random","RRRS craft bazar","Crème Atelier","Dough And Muff","Funcakes",
  "The reders artifact","Banarasi Bhelpuri","BITE & BLOOM","Bite&Smile","Bussin' bites","Food Fiesta",
  "Food Point","Food satll","Food stall","Food stall","Kashi food corner","Lottery and Tea stall",
  "Priyanka","Snack attack","Aim Shooter","Creative gaming","Game and activities stall","Game Galaxy",
  "Loot lo club","Mysterious Goal Challenge","Mystery Scan and Fortune Wheel","Mystic Arcade 🪩",
  "Shoot Master","Sniper Shooting","The Salers","To provide student with entertainment, relaxation and a fun way to develop creativity, problem solving and trust on yourself",
  "VICTORY ARENA Play • Compete • Win!","The Cozy Creating Creations","Charms and craft","2 good 2 go",
  "Lucky 16","Swad-e-banaras","Flavour fusion","Fun Fusion","Fortune Frenzy","Moodboard","Game zone",
  "Wok & whirl","Team Hunar Bazaar","The Cozy Creations","TRY DELICIOUS FOOD","Top level gamers",
  "Take Me Home!","Floral vibe","The Crafty Corner","Gen -z stall","The chatori junction","~Papdi paradise~",
  "Mehfil-e-hunar","Act On Craft","Fun zone","Double A artworks","The Cheesy Slice","Crafty corner",
  "Offbeat","Rakhi mela","Yum Junction","The Aiming Mastery Game","Kingster Kingdom","Art and craft",
  "We COOKED","Frosted Brews","The Clean canvas","Sketch & Smile","Brain Blitz","Fun Fiesta",
  "The munch corner","U.P college ka prasidh lal peda"
];

const existingOwners = [
  "Naitik Srivastava","Charu Prajapati","Divya Singh","Anandi Singh","Janhavi Gupta","Arpit yadav",
  "Aditi Singh","Shashank keshari","Umaima Rais Khan","Parul Kumari","Palak Mishra","Atharv singh",
  "Anuj Kumar Gupta","Shreya Singh","Akriti Singh","Hirtika Raghuvanshi","Anshika Rastogi",
  "Prabal Pratap Singh","Roshni rai","Rudraksh Pratap Singh","Ayush kumar singh","Shubh Mishra",
  "Atul Singh","Priyanka gupta","Himanshi pandey","Shashwat Singh","Viraj Singh","Dhananjay pandey",
  "Angel Singh","Reyansh tiwari","Adirya Srivastava","Samar Bahadur Singh","Vidhi Gupta","Raj yadav",
  "Ayank Pratap Singh","Gautam Kumar","Sarthak singh","Shivam Jaiswal","Akriti Pal","Stuti",
  "Anandi Dubey","Naitik Singh","Grasy Shahi","Aparna mishra","Kavya yadav","Ayush Agrawal",
  "Vaani Srivastava","Tanishka Srivastava","Trisha Tiwari","Neelam Singh (Principal)","Adhishree Srivastava",
  "Abhinav Singh","Dev Raghuvanshi","Aradhya singh","Amrita singh","Prince Patel","Akshara Singh",
  "Iksha Upadhyay","Archana chauhan","Rida Ekbal","Kriti Srivastava","Yashraj Singh Raghuvanshi",
  "Arunav Kumar","Atharva Garg","Aditi Singh","Prabhav Singh","Shubh agarwal","Yash Kumar Srivastava",
  "Divyansh Rai","Shreyansh Sashwat","Vaibhavi Srivastava","Shreya Singh","Aditya Raj Singh",
  "Nabya Singh","Akshya yadav","Adya rai","Kritika Srivastava","Jyotsana singh","Anshuman kumar"
];

const existingPhones = [
  "8382062145","7897282670","6257296869","6306263683","7518001219","8160206869","8528761161",
  "6387780257","8707655375","7007357427","8423074361","7233083889","7905815423","9220941934",
  "9792472796","8004308415","9336647434","6307502560","9260903265","8574153255","9140851913",
  "9984011987","7355795190","8188020099","9123925258","9208495159","638729265","7985233882",
  "7651995121","9120297641","9795776988","6307565070","7355401323","7275983956","8795536786",
  "8757011937","9336263134","9569545289","9336937450","6307720637","6307205670","9140805605",
  "8707673810","7310150372","8303197887","9569197565","8604390878","9511024925","8957882425",
  "9452566818","7985844561","9140136699","8528289192","6394347968","9452787768","7860171147",
  "9453139323","6390801603","8922985557","9984770888","8618259326","9792140474","9452168707",
  "7266011134","9569847205","7398226377","8299749123","7839347226","8052334455","9305587096",
  "9140474840","9450872224","9214628254","9161731528","7652003241","8840255947","9919414296",
  "7355033983","8400390307"
];

function normalize(str) {
  return str.toString().toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

function getPhone(raw) {
  return String(raw || '').replace(/[^0-9]/g, '').slice(-10);
}

function isDuplicate(name, owner, phone) {
  const n = normalize(name);
  const o = normalize(owner);
  const p = getPhone(phone);
  
  // Check by name
  for (const en of existingNames) {
    if (normalize(en) === n) return true;
  }
  
  // Check by phone
  if (p.length >= 10 && existingPhones.includes(p)) return true;
  
  // Check by owner
  for (const eo of existingOwners) {
    if (normalize(eo) === o) return true;
  }
  
  return false;
}

// ── Load Excel ──
const filePath = path.join(__dirname, 'src', 'assets', 'Hunar Bazaar 2026 (Responses) (4).xlsx');
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // "Form Responses 1"
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { defval: '', raw: true });

const headers = Object.keys(data[0]);

// Find columns
const colName = headers.find(h => h.toLowerCase().includes('stall')) || headers[7];
const colOwner = headers.find(h => h.toLowerCase().includes('your name')) || headers[1];
const colClass = headers.find(h => h.toLowerCase().includes('class')) || headers[2];
const colSection = headers.find(h => h.toLowerCase().includes('section')) || headers[3];
const colPhone = headers.find(h => h.toLowerCase().includes('contact') || h.toLowerCase().includes('number')) || headers[4];
const colTeam = headers.find(h => h.toLowerCase().includes('team') || h.toLowerCase().includes('member')) || headers[6];
const colCategory = headers.find(h => h.toLowerCase().includes('category')) || headers[8];
const colDesc = headers.find(h => h.toLowerCase().includes('description') || h.toLowerCase().includes('brief')) || headers[9];
const colPrice = headers.find(h => h.toLowerCase().includes('price')) || headers[10];
const colInvest = headers.find(h => h.toLowerCase().includes('investment')) || headers[11];
const colReq = headers.find(h => h.toLowerCase().includes('requirement')) || headers[12];
const colTime = headers.find(h => h.toLowerCase().includes('timestamp') || h.toLowerCase().includes('time')) || headers[0];

const results = [];

for (let i = 0; i < data.length; i++) {
  const row = data[i];
  const timestamp = row[colTime];
  const name = (row[colName] || '').toString().trim();
  const owner = (row[colOwner] || '').toString().trim();
  const classRaw = (row[colClass] || '').toString().trim();
  const section = (row[colSection] || '').toString().trim();
  const phone = getPhone(row[colPhone]);
  const team = (row[colTeam] || '').toString().trim();
  const category = (row[colCategory] || '').toString().trim();
  const description = (row[colDesc] || '').toString().trim();
  const price = (row[colPrice] || '').toString().trim();
  const investment = (row[colInvest] || '').toString().trim();
  const requirements = (row[colReq] || '').toString().trim();
  
  let classStr = classRaw;
  if (section && !classStr.includes(section)) classStr += ' ' + section;
  
  // Check for spam/invalid
  const ownerLower = owner.toLowerCase();
  const spamKeywords = ['test', 'abc', 'xyz', 'asdf', 'qwerty', 'demo'];
  const isSpam = spamKeywords.some(k => ownerLower.includes(k)) && ownerLower.length < 10;
  
  const isIncomplete = !name || !owner || phone.length < 10 || !category;
  const isRandom = name.length < 3 || owner.length < 2;
  
  // Check duplicate
  const dup = isDuplicate(name, owner, phone);
  
  let status = '';
  if (isSpam) status = 'SPAM';
  else if (isIncomplete || isRandom) status = 'INVALID';
  else if (dup) status = 'DUPLICATE';
  else status = '✅ NEW';
  
  results.push({
    row: i + 1,
    status,
    name,
    owner,
    phone,
    category,
    team: team.substring(0, 60),
    description: description.substring(0, 80),
  });
}

// Print results
console.log('\n=== STALL VERIFICATION — RESULTS ===');
console.log('Legend: ❌ DUPLICATE | ❌ SPAM | ❌ INVALID | ✅ NEW (not in existing 79 stalls)\n');

results.forEach(r => {
  const icon = r.status === '✅ NEW' ? '✅' : '❌';
  console.log(`${icon} Row ${r.row.toString().padEnd(3)} | ${r.status.padEnd(10)} | "${r.name}" | ${r.owner}`);
});

const newEntries = results.filter(r => r.status === '✅ NEW');
const dupEntries = results.filter(r => r.status === 'DUPLICATE');
const invalidEntries = results.filter(r => r.status !== '✅ NEW' && r.status !== 'DUPLICATE');

console.log('\n\n=== SUMMARY ===');
console.log(`Total entries: ${results.length}`);
console.log(`Duplicate (already in stalls.ts): ${dupEntries.length}`);
console.log(`Invalid/spam/incomplete: ${invalidEntries.length}`);
console.log(`✅ GENUINELY NEW stalls found: ${newEntries.length}`);

if (newEntries.length > 0) {
  console.log('\n=== NEW STALLS DETAILS ===\n');
  newEntries.forEach(e => {
    console.log(`Row ${e.row}: "${e.name}" by ${e.owner} (${e.phone}) - ${e.category}`);
  });
} else {
  console.log('\n✅ Current dataset (79 stalls) is UP TO DATE.');
  console.log('✅ No modifications needed for stalls.ts.');
}

