const { getJestTransformer } = require('ts-jest/utils');
const { createTransformer } = require('babel-jest');

const transformer = getJestTransformer();

module.exports = transformer;

module.exports = createTransformer({
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
});
