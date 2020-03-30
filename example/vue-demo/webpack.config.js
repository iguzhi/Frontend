const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: 'url-loader?limit=8192'
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]?[hash]'
        // }
      },
      {
        test: /\.(eot|svg|woff|woff2|wtf)$/,
        use: 'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: ['vue-style-loader', 'css-loader', 'less-loader']
            // scss: ['vue-style-loader', 'css-loader', 'scss-loader'],
            // sass: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
};
