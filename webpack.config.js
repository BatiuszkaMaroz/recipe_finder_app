const path = require('path');
// const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /.+\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};
