const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.jsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[chunkhash]-[chunkhash].js',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['babel-loader'], exclude: /node_modules/ },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&sourceMap', 'autoprefixer-loader?browsers=last 2 version', 'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true']
        })
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanPlugin([path.resolve('dist')], { root: path.resolve(__dirname, '../') }),
    new ExtractTextPlugin('[name].css', {allChunks: true}),
    HtmlWebpackPluginConfig,
    // optimizations
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new FaviconsWebpackPlugin(path.resolve('favicon.png')),
    new webpack.DefinePlugin({
      'process.env': {
        env: '"development"',
        NODE_ENV: '"development"',
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/constants/cardImages/',
        to: 'cardImages/',
      },
      {
        from: './src/constants/rarityBorders/',
        to: 'rarityBorders/',
      },
      {
        from: './src/components/Tutorial/images',
        to: 'tutorialImages/',
      }
    ])
  ]
};
