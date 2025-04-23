
export default {
    preset: '@testing-library/react',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['/node_modules/(?!msw)'],
}


