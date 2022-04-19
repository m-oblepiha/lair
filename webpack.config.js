const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.mode === 'prod';

module.exports = () => ({
  mode: isProd ? 'production' : 'development',
  entry: {
    core: join(__dirname, 'src/index.tsx'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: join('chunks', '[id]', '[id].js'),
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
          'sass-loader',
        ],
        exclude: /\.global\.scss$/,
      },
      {
        test: /\.global.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|md|ico|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
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
    }),
  ].concat(
    isProd
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: join('chunks', '[id]', '[id].css'),
          }),
        ]
      : []
  ),
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
});
