const path = require('path');
// const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    filename: 'js/[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'cheap-source-map',
  plugins: [
    // new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
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
