// scripts/report-run.js
const dayjs = require('dayjs');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1) One timestamp for this run, shared with Cypress
const ts = dayjs().format('YYYY-MM-DD_HH-mm-ss');
process.env.RUN_TS = ts;
console.log('RUN_TS / ts =', ts);

// 2) Build extra args from npm (e.g. --spec ...)
const args = process.argv.slice(2);          // e.g. ['--spec', 'cypress/e2e/multipleActions.cy.js']
const extraArgs = args.join(' ');
console.log('Cypress extra args =', extraArgs || '(none)');

// 3) Run Cypress (one spec if --spec passed, else all tests)
const cmd = `npx cypress run --reporter mochawesome ${extraArgs}`;
console.log('Running command:', cmd);

let cypressStatus = 0;

try {
  execSync(cmd, { stdio: 'inherit' });
} catch (e) {
  // Cypress exited with failures (status 1), but we still want reports
  cypressStatus = e.status || 1;
  console.error('Cypress run failed with code', cypressStatus, '- continuing to merge reports...');
}

// 4) Merge JSONs from THIS run only
const runDir = `cypress/reports/${ts}`;
const jsonDir = `${runDir}_JSON`;
const mergedJsonPath = path.join(jsonDir, 'output-merged.json');

console.log('runDir =', runDir);
console.log('mergedJsonPath =', mergedJsonPath);

// Ensure JSON output directory exists
fs.mkdirSync(jsonDir, { recursive: true });

// Merge JSON files like the manual command you ran:
execSync(`npx mochawesome-merge "${runDir}/*.json" -o ${mergedJsonPath}`, {stdio: 'inherit',});

// 5) Generate HTML in its own timestamped folder
const htmlOutDir = `${runDir}_HTML`;
console.log('htmlOutDir =', htmlOutDir);

execSync(`npx mochawesome-report-generator ${mergedJsonPath} -f index -o ${htmlOutDir}`, {stdio: 'inherit', });

console.log(`HTML report created at: ${htmlOutDir}/index.html`);
