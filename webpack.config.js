const path = require('path')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'xuntos-auth.js',
    path: path.resolve(__dirname, 'dist')
  },
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
