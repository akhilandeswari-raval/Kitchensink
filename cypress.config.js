const { defineConfig } = require("cypress");
const dayjs = require('dayjs')
const tsFromEnv = process.env.RUN_TS || dayjs().format('YYYY-MM-DD_HH-mm-ss')

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder:	'cypress/videos',
  video: true,
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: `cypress/reports/${tsFromEnv}`,
    reportFilename: 'mochawesome',
    testIsolation: false,
  },
});