const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'xuntos-auth.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new NodemonPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
