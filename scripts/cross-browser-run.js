// scripts/parallel-report-run.js
const dayjs = require('dayjs')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// 1) Timestamp for this multi-browser parallel run
const ts = dayjs().format('YYYY-MM-DD_HH-mm-ss')
console.log('Multi-browser RUN_TS =', ts)

// 2) Run Cypress in parallel across browsers (uses npm-run-all2: run-p) and all the browsers have their own mochawesome reports generator
// Assumes you have scripts: cy:chrome, cy:edge, cy:electron in package.json
const cmd = 'npx run-p cy:chrome cy:edge cy:electron';
console.log('Running command:', cmd)

let cypressStatus = 0
try {
  execSync(cmd, { stdio: 'inherit' })
} catch (e) {
  cypressStatus = e.status || 1
  console.error(
    'Parallel multi-browser Cypress run failed with code', cypressStatus, '- continuing to merge reports...'
  )
}

// 3) Merge ALL mochawesome JSONs (all specs, all browsers)
const mergeDir = 'cypress/reports'
const jsonDir = `cypress/reports/${ts}_JSON`
const mergedJsonPath = path.join(jsonDir, 'output-merged.json')

console.log('Merging JSON from:', mergeDir)
console.log('mergedJsonPath =', mergedJsonPath)

fs.mkdirSync(jsonDir, { recursive: true })

// Glob covers everything under cypress/reports, including browser-specific runs
execSync(`npx mochawesome-merge "${mergeDir}/**/*.json" -o ${mergedJsonPath}`, { stdio: 'inherit' })

// 4) Generate HTML report for this multi-browser parallel run
const htmlOutDir = `cypress/reports/${ts}_HTML`
console.log('htmlOutDir =', htmlOutDir)

execSync(`npx mochawesome-report-generator ${mergedJsonPath} -f index -o ${htmlOutDir}`, { stdio: 'inherit' })

console.log(`Parallel HTML report created at: ${htmlOutDir}/index.html`)

// Exit with Cypress status so CI can fail the job if tests failed
process.exit(cypressStatus)
