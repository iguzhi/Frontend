const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: 'url-loader?limit=8192'
      },
      {
        test: /\.(eot|svg|woff|woff2|wtf)$/,
        use: 'url-loader'
      }
    ]
  }
};
