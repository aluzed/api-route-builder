/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};

module.exports = config;
