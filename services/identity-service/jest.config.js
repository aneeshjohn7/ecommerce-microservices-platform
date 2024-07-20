module.exports = {
  testEnvironment: 'node',

  testMatch: ['<rootDir>/tests/**/*.spec.ts'],

  setupFiles: ['<rootDir>/tests/setup.ts'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
};