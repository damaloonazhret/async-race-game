module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '\\.(ts|tsx|js|jsx|scss)$': 'ts-jest',
    },
    testMatch: ['**/*.test.(ts|tsx)'],
};
