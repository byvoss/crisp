#!/usr/bin/env node

/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

const fs = require('fs');
const path = require('path');

// Define CSS files in order
const cssFiles = [
  'crisp-reset.css',
  'crisp-tokens.css',
  'crisp-themes.css',
  'crisp-layouts.css',
  'crisp-components.css',
  'crisp-properties.css',
  'crisp-utilities.css',
  'crisp-states.css',
  'crisp-modern.css',
  'crisp-responsive.css'
];

// Read and concatenate all CSS files
let combinedCSS = `/**
 * @license
 * CRISP - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

`;

cssFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    combinedCSS += `\n/* === ${file} === */\n${content}\n`;
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// Write combined CSS
fs.writeFileSync(path.join(__dirname, '..', 'dist', 'crisp.css'), combinedCSS);

// Create lite version (without themes and modern features)
const liteFiles = [
  'crisp-reset.css',
  'crisp-tokens.css',
  'crisp-layouts.css',
  'crisp-components.css',
  'crisp-properties.css',
  'crisp-utilities.css'
];

let liteCSS = `/**
 * @license
 * CRISP Lite - Code Rules for Intuitive Semantic Projects
 * Copyright (c) 2025 Vivian Burkhard Voss, ByVoss Technologies
 * MIT License - see LICENSE file for details
 */

`;

liteFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', 'src', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    liteCSS += `\n/* === ${file} === */\n${content}\n`;
  }
});

fs.writeFileSync(path.join(__dirname, '..', 'dist', 'crisp-lite.css'), liteCSS);

console.log('✅ CSS build complete');