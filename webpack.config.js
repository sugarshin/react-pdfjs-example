const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const production = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8080
const buildDev = 'build-dev'
const buildDir = production ? 'build' : buildDev

const htmlWebpackPluginConfig = {
  filename: '../index.html',
  minify: { collapseWhitespace: true },
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new HtmlWebpackPlugin(production ? htmlWebpackPluginConfig : undefined),
]

const entry = ['babel-polyfill', './src/index.js']

if (production) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  )
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  entry.unshift(
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  )
}

module.exports = {
  plugins,
  entry,
  cache: true,
  output: {
    path: `${buildDir}/assets`,
    filename: production ? 'app-[hash].js' : 'app.js',
  },
  display: { errorDetails: true },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css?minimize', 'stylus'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?minimize'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: `./${buildDev}`,
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    port: PORT,
  },
}
