# Contact Page Transformation - TODO

## Steps

- [x] Read and analyze all relevant files
- [x] Create and approve the plan

### Implementation

- [x] **Step 1: Rewrite Contact.tsx - Header Section**
  - Updated title to "Get In Touch" with gradient text effect
  - Updated subtitle with professional welcoming text about Bazaar-E-Hunar 2027
  - Kept all animations intact

- [x] **Step 2: Add Quick Help Section**
  - Added "Need Assistance?" info card above contact cards
  - Guide showing who to contact for what (Registration → Teacher, Coordination → Student, General → Email)

- [x] **Step 3: Create Individual Contact Info Cards**
  - Card 1: School Address (MapPin + School icons, full Sant Atulanand Convent School address)
  - Card 2: Teacher In-Charge (Phone icon, Sneha Ma'am, +91 96483 93187 with tel: link)
  - Card 3: Student Coordinator (User icon, Sachin Yadav, +91 9140647427 with tel: link)
  - Card 4: Official Email (Mail icon, principalsacs@gmail.com with mailto: link)
  - Each with premium glassmorphism, gradient border overlay on hover, hover lift effect, colored icon containers

- [x] **Step 4: Update Contact Form**
  - Firebase functionality unchanged (same submit handler, same service)
  - Updated labels: Your Name, Email Address, Subject, Message
  - Updated placeholders to normal text
  - Updated button: Send Message with Send icon
  - Updated loading: Sending... with spinner
  - Updated success/error messages to friendly professional text

- [x] **Step 5: Add Google Maps iframe**
  - Replaced static image with Google Maps iframe embed
  - Wrapped in premium glass card with rounded corners
  - Added "Visit Our Campus" heading with address subtitle
  - Responsive container (300px mobile / 400px desktop)

- [x] **Step 6: Add Footer CTA**
  - Added "Ready to Showcase Your Talent?" section
  - "Register Your Stall" button linking to /register
  - Premium card with gradient glow background

- [x] **Step 7: Visual Enhancements**
  - Added gradient blobs (cyan, purple, blue) as background decorations
  - Soft radial gradient background glow
  - Removed all cyber aesthetics (no bg-cyber-grid, no cyber overlay, no terminal styling)
  - Maintained Bazaar-E-Hunar design language with glass cards and gradient accents

- [x] **Step 8: Accessibility & Responsiveness**
  - tel: links for phone numbers with proper aria-labels
  - mailto: link for email with aria-label
  - htmlFor/id associations on all form inputs
  - aria-label on all interactive elements
  - Proper keyboard accessibility (button, inputs, links)
  - Mobile-friendly layout: stacks vertically on small screens
  - Responsive cards with equal height via flex layout

### Final Review

- [x] Build successful (vite build completed)
- [x] Firebase functionality intact (form submit handler unchanged)
- [x] Contact service unchanged
- [x] Clickable phone/email verified

