import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { join } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const CircularDependencyPlugin = require('circular-dependency-plugin');

const isProd = process.env.mode === 'prod';

const config: Configuration = {
  mode: isProd ? 'production' : 'development',
  entry: {
    core: join(__dirname, 'src/index.tsx'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: join('chunks', '[id]', '[chunkhash][id].js'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentContext: join(__dirname, 'src'),
                localIdentName: isProd ? '[hash:base64:4]' : '[name]--[local]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [join(__dirname, 'src/common/styles')],
              },
            },
          },
        ],
        exclude: /\.global\.scss$/,
      },
      {
        test: /\.global.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {},
          },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [join(__dirname, 'src/common/styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.woff2$/i,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.scss', '...'],
    plugins: [new TsconfigPathsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LAIR',
      template: join(__dirname, 'src/assets/index.html'),
      favicon: join(__dirname, 'src/assets/favicon.png'),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
    }),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: join('chunks', '[id]', '[chunkhash][id].css'),
          }),
        ]
      : []),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    static: {
      directory: join(__dirname, 'dist'),
    },
    compress: true,
    hot: true,
    port: 9000,
  },
  stats: {
    preset: 'minimal',
    chunks: true,
  },
};

export default config;
