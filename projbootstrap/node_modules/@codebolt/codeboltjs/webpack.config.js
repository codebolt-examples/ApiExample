const path = require('path');
const { node } = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.ts', // Your main TypeScript file
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
 },
 resolve: {
    extensions: ['.tsx', '.ts', '.js'],
 },
 output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2'
  },
};