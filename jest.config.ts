export default {
  clearMocks: true,
  coverageProvider: "v8",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^#/(.*)$": "<rootDir>/test/$1",
  },
  testEnvironment: "miniflare",
  transform: {
    "^.+\\.(t|j)sx?$": "esbuild-jest",
  },
  resolver: `<rootDir>/test/resolver.js`,
};
