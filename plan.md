# Data Synchronization Plan

## Information Gathered

### Source of Truth
- **Excel file**: `src/assets/Hunar Bazaar 2026 (Responses) (1).xlsx`
- **Sheet**: "Form Responses 1" — contains **43 total entries** (all raw responses)
- **Sheet**: "Valid Responses" — contains **25 entries** (pre-filtered, same as first 25 rows of Form Responses 1)

### Current stalls.ts: 25 stalls (S-001 to S-025)

### Duplicates Found (by stall/team, keeping earliest timestamp)
1. **Rudraksh Pratap Singh** — "Food stall" (Row 5 @ 46228.75689 vs Row 12 @ 46228.85524) → Keep Row 5
   - Existing S-012 is based on Row 12 (duplicate) → **Remove S-012**
2. **Raj Yadav** — "Shoot Master" (Row 10 @ 46228.82457 vs Row 15 @ 46228.86223) → Keep Row 10
   - Existing S-015 is based on Row 15 (duplicate) → **Remove S-015**
3. **Akriti Pal / Adhishree Srivastava** — "The Cozy Creating Creations" (Row 24 @ 46229.02159) vs "The Cozy Creations" (Row 25 @ 46229.02246) → Keep Row 24
   - Existing S-025 is based on Row 25 (duplicate) → **Remove S-025**

### New Stalls to Add (Rows 26-43, 18 stalls)
- Row 26: Viraj Singh — Creative gaming (Games & Activities)
- Row 27: Roshni rai — Food satll (Food & Beverages)
- Row 28: Arpit yadav — Little Artists (Arts & Crafts)
- Row 29: Atharv singh — The reders artifact (Books & Stationery)
- Row 30: Palak Mishra — Funcakes (Bakery & Desserts)
- Row 31: Naitik Srivastava — Artistry Hub (Arts & Crafts)
- Row 32: Shashwat Singh — Aim Shooter (Games & Activities)
- Row 33: Sarthak singh — Bottle Flip Challenge (Games & Activities)
- Row 34: Shreya Singh — BITE & BLOOM (Food & Beverages)
- Row 35: Shivam Jaiswal — VICTORY ARENA (Games & Activities)
- Row 36: Ayank Pratap Singh — Sniper Shooting (Games & Activities)
- Row 37: Anuj Kumar Gupta — Banarasi Bhelpuri (Food & Beverages)
- Row 38: Umaima Rais Khan — Crème Atelier (Bakery & Desserts)
- Row 39: Atul Singh — Lottery and Tea stall (Food & Beverages)
- Row 40: Angel Singh — Game Galaxy (Games & Activities)
- Row 41: Janhavi Gupta — Crafts cottage or crafty corner (Arts & Crafts)
- Row 42: Akriti Singh — Bite&Smile (Food & Beverages)
- Row 43: Anandi Singh — Craft Carnival (Arts & Crafts)

### Final Stall Count
25 (original) - 3 (duplicates removed) + 18 (new) = **40 stalls**

### Category Normalization
- "🎨 Arts & Crafts" → "Arts & Crafts"
- "🍔 Food & Beverages" → "Food & Beverages"
- "🎮 Games & Activities" → "Games & Activities"
- "🍰 Bakery & Desserts" → "Bakery & Desserts"
- "💍 Handmade Accessories" → "Handmade Accessories"
- "📚 Books & Stationery" → "Books & Stationery"
- "Others" → "Others" (for Charms and craft by Stuti)

### Location Mapping (based on category)
- Arts & Crafts, Handmade Accessories → "Arts & Crafts Zone"
- Food & Beverages, Bakery & Desserts → "Food Zone"
- Games & Activities → "Games Zone"
- Books & Stationery, Others → "Exhibition Zone"

## Plan

### Step 1: Create a Node.js script (`generate-stalls-from-excel.cjs`)
That reads the Excel file, processes all 43 rows:
- Deduplicates (keep earliest by timestamp)
- Normalizes categories (strip emoji prefixes)
- Cleans data (trim spaces, fix capitalization)
- Maps categories to locations
- Generates the complete `stalls.ts` output

### Step 2: Regenerate `src/data/stalls.ts`
Replace the file with the fresh dataset from the script.

### Step 3: Update `src/data/stallIcons.ts`
Add "Others" category icon mapping (use default/paint icon).

### Step 4: Update `StallStatistics.tsx`
The component already uses `stallsData.length` dynamically — no changes needed for stats recalculation. But MAX_STALLS should stay 50.

### Step 5: Verify
- Run `npm run build`
- Check for TypeScript errors
- Check category filters still work
- Verify stall icons load correctly

## Files to Modify
- `src/data/stalls.ts` — Full replacement
- `src/data/stallIcons.ts` — Add "Others" category entry
- `src/components/StallStatistics.tsx` — No changes needed (already dynamic)

## Follow-up
- Run `npm run build` to verify no TypeScript errors
- Manual verification of stall count, categories, and icons

