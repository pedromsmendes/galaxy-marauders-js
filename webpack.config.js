const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/**
 * @param {any} env
 * @param {any} argv
 * @returns {import('webpack').Configuration}
*/
const config = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: './src/index.ts',
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    output: {
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      sourceMapFilename: '[name].[contenthash:8].map',
      chunkFilename: '[id].[chunkhash:8].js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        // TypeScript Loader
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // CSS Loaders
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Asset Loaders (images, fonts, etc.)
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      hot: true, // Enable Hot Module Replacement
      open: true, // Open the browser after server had been started
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};

module.exports = config;
