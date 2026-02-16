// scripts/parallel-report-run.js
const dayjs = require('dayjs');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1) Timestamp for this parallel run
const ts = dayjs().format('YYYY-MM-DD_HH-mm-ss');
console.log('Parallel RUN_TS =', ts);

// 2) Run cypress-parallel, which uses "cy:runwithmochawesome" to generate mochawesome reports (mochawesome reporter)
const cmd = 'npx cypress-parallel -s cy:runwithmocahwesome -t 4 -d "cypress/e2e/*.js"';
console.log('Running command:', cmd);

let cypressStatus = 0;
try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  cypressStatus = e.status || 1;
  console.error('Parallel Cypress run failed with code', cypressStatus, '- continuing to merge reports...');
}

// 3) Merge ALL mochawesome JSONs from this project
const mergeDir = 'cypress/reports';
const jsonDir = `cypress/reports/${ts}_JSON`;
const mergedJsonPath = path.join(jsonDir, 'output-merged.json');

console.log('Merging JSON from:', mergeDir);
console.log('mergedJsonPath =', mergedJsonPath);

fs.mkdirSync(jsonDir, { recursive: true });

execSync(`npx mochawesome-merge "${mergeDir}/**/*.json" -o ${mergedJsonPath}`, {stdio: 'inherit',});

// 4) Generate HTML report for the parallel run
const htmlOutDir = `cypress/reports/${ts}_HTML`;
console.log('htmlOutDir =', htmlOutDir);

execSync(`npx mochawesome-report-generator ${mergedJsonPath} -f index -o ${htmlOutDir}`, {stdio: 'inherit',});

console.log(`Parallel HTML report created at: ${htmlOutDir}/index.html`);