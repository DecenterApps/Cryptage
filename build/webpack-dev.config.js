const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const compareConfig = require('./compareConfig');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

Promise.resolve(compareConfig.compareConfig())
  .catch((error) => {
    console.log("\x1b[31m", error);
    process.exit(1);
  });

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.jsx',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders:[
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: { emitWarning: true, emitError: false }
        }
      ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        env: '"development"'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin(path.resolve('favicon.png')),
    new WriteFilePlugin({
      test: /^cardImages/,
    }),
    new CopyWebpackPlugin([
      {
        from: './src/constants/cardImages/',
        to: 'cardImages/',
      }
    ])
  ]
};
