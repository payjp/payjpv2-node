/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "index.ts",
    "payjpv2.ts",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/tests/**",
  ],
  coverageDirectory: "coverage",
};
