const fs = require('fs');
let content = fs.readFileSync('src/app/dashboard/page.jsx', 'utf8');

// Replace sizes with more standard ones:
content = content.replace(/fontSize: "36px"/g, 'fontSize: "24px"');
content = content.replace(/fontSize: "32px"/g, 'fontSize: "24px"');

// 20px is used heavily for descriptions and footers. Make it 14px.
content = content.replace(/fontSize: "20px"/g, 'fontSize: "14px"');

// 17px is used for names. Make it 14px.
content = content.replace(/fontSize: "17px"/g, 'fontSize: "14px"');

// 16px is used for sidebar, links. Make it 14px.
content = content.replace(/fontSize: "16px"/g, 'fontSize: "14px"');

// 18px is used for section headers (16px), table headers (12px), activity time (12px), role (12px).
// We'll replace 18px based on context.
// Table headers (uppercase context):
content = content.replace(/fontSize: "18px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase"/g, 'fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase"');
// Activity time, role etc:
content = content.replace(/<p style={{ color: "#6b89b8", fontSize: "18px"/g, '<p style={{ color: "#6b89b8", fontSize: "12px"');
content = content.replace(/<p style={{ color: "#9aaac0", fontSize: "18px"/g, '<p style={{ color: "#9aaac0", fontSize: "12px"');
// Section Titles:
content = content.replace(/<h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px"/g, '<h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px"');
// Quick Action Title
content = content.replace(/style={{ color: "#0d1b38", fontFamily: "'Inter', sans-serif", fontSize: "18px"/g, 'style={{ color: "#0d1b38", fontFamily: "\'Inter\', sans-serif", fontSize: "16px"');

// The Tailwind classes
content = content.replace(/text-base/g, 'text-sm');

fs.writeFileSync('src/app/dashboard/page.jsx', content);
console.log("Done");
