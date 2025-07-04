#!/usr/bin/env node

/**
 * Build script for CRISP CSS Framework
 * Concatenates source files in correct order
 */

const fs = require('fs');
const path = require('path');

// Define file order
const fileOrder = [
  'crisp-reset.css',
  'crisp-tokens.css',
  'crisp-themes.css',
  'crisp-layouts.css',
  'crisp-components.css',
  'crisp-properties.css',
  'crisp-utilities.css'
];

// Modern build (with modern features)
const modernFileOrder = [
  ...fileOrder,
  'crisp-modern.css'
];

// Paths
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Build header
const header = `/**
 * CRISP CSS Framework v${require('./package.json').version}
 * Code Rules for Intuitive Semantic Projects
 * 
 * Copyright (c) ${new Date().getFullYear()} ByVoss
 * Licensed under MIT
 * https://byvoss.tech/crisp
 */

`;

// Concatenate files
let output = header;

fileOrder.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    output += `\n/* ===== ${file} ===== */\n${content}\n`;
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Write output
fs.writeFileSync(path.join(distDir, 'crisp.css'), output);
console.log('✅ Built crisp.css');

// Create module exports
const moduleExports = `/* CommonJS */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = '${path.join(distDir, 'crisp.css')}';
}

/* ES6 */
export default '${path.join(distDir, 'crisp.css')}';
`;

fs.writeFileSync(path.join(distDir, 'index.js'), moduleExports);
console.log('✅ Created module exports');