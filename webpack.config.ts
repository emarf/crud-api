import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production',
  entry: './src/server.ts',
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
};

export default config;