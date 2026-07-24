const fs = require('fs');
const path = require('path');

const files = [
  'App.tsx', 'layouts/MainLayout.tsx', 'pages/About.tsx', 
  'pages/Contact.tsx', 'pages/EventMap.tsx', 'pages/FAQ.tsx', 
  'pages/Gallery.tsx', 'pages/Home.tsx', 'pages/Register.tsx', 
  'pages/Rules.tsx', 'pages/Stalls.tsx'
];

files.forEach(f => {
  const p = path.join('src', f);
  let c = fs.readFileSync(p, 'utf8');
  
  // Remove `import React from 'react';` entirely
  c = c.replace(/import React from 'react';\r?\n/g, '');
  // Remove `React, ` from `import React, { ... } from 'react';`
  c = c.replace(/import React, \{/g, 'import {');
  
  // Remove unused specific icons
  c = c.replace(/, ArrowRight/g, '');
  c = c.replace(/, MapPin/g, '');
  c = c.replace(/MapPin, /g, '');
  
  // Fix type import in Stalls.tsx
  if (f === 'pages/Stalls.tsx') {
    c = c.replace(/import \{ stallsData, categories, Stall \} from '\.\.\/data\/stalls';/, "import { stallsData, categories } from '../data/stalls';\nimport type { Stall } from '../data/stalls';");
  }
  
  fs.writeFileSync(p, c);
});
console.log("Fix complete");
