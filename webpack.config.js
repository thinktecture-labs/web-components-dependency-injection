const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'inline-source-map',
  entry: {
    // One entry point per web component
    'root-component': './sample/components/root-component.ts',
    'poke-list-component': './sample/components/poke-list-component.ts',
    'authorized-component': './sample/components/authorized-component.ts',
    'language-switcher': './sample/components/language-switcher-component.ts',
    'header': './sample/components/header-component.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    // Add ".ts" and ".tsx" as resolvable extensions.
    extensions: [ '.ts', '.js' ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        dependencyInjection: {
          test: /[\\/]src[\\/]/,
          name: 'web-components-dependency-injection',
          enforce: true,
          reuseExistingChunk: true,
        },
        services: {
          test: /[\\/]sample\/services[\\/]/,
          name: 'services',
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './sample/index.html',
      filename: './index.html',
      inject: 'head',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'json',
      generateStatsFile: true,
    }),
  ],
};
