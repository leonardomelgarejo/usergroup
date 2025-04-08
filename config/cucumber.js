module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "test/features/"
    ],
    dryRun: false,
    require: [
      "test/steps/*.ts",
      "hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json"
    ],
    parallel: 1,
    strict: false,
    timeout: 30000
  }
}
