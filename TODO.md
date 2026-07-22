# Production Readiness Audit - Todo

## Issues Found

### 1. TypeScript Errors (tsc -b fails with noUnusedLocals)
- [ ] **Home.tsx**: Unused imports `Quote`, `ArrowUpRight`, `CheckCircle2`, `Coins` from lucide-react
- [ ] **Contact.tsx**: Potential unused imports check

### 2. GitHub Pages Config  
- [ ] **vite.config.ts**: Missing `base` path for GitHub Pages deployment
- [ ] Create `vercel.json` for Vercel SPA routing

### 3. SEO
- [ ] **index.html**: Missing meta tags, OG tags, proper title
- [ ] No `robots.txt` or `sitemap.xml`

### 4. Performance (Chunk Size)
- [ ] Main JS bundle > 1MB - needs code splitting with React.lazy()

### 5. Cleanup & Polish
- [ ] Remove unused `App.css` (contains Vite boilerplate)
- [ ] Ensure all assets load correctly

## Execution Plan
1. Fix TypeScript errors (unused imports)
2. Add vite config with base path for GitHub Pages
3. Create vercel.json
4. Improve index.html SEO
5. Implement code splitting
6. Clean up App.css
7. Final build verification

