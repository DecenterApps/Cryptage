const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const compareConfig = require('./compareConfig')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const phaserModule = path.join(__dirname, '../node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

Promise.resolve(compareConfig.compareConfig())
  .catch((error) => {
    console.log('\x1b[31m', error)
    process.exit(1)
  })

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
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
      {
        test: /\.(js|jsx)$/, loaders: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {emitWarning: true, emitError: false}
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
      },
      {test: /pixi\.js/, loaders: ['expose-loader?PIXI']},
      {test: /phaser-split\.js$/, loaders: ['expose-loader?Phaser']},
      {test: /p2\.js/, loaders: ['expose-loader?p2']}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      phaser: phaser,
      pixi: pixi,
      p2: p2
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */}),
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
}
