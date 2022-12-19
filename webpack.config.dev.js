const path = require('path');
const webpack = require('webpack');
const args = process.argv;
let https = false;
let disableCORP = true;
if (args.includes('https')) https = true;
if (args.includes('corp')) disableCORP = false;
module.exports = {
  mode: "development",
  devtool: 'eval',
  entry: {
    index: ['./src/js/index.js']
  },
  stats: {
    errorDetails: true
  },
  output: {
    path: path.resolve(__dirname, '/static'),
    publicPath: '/static',
    hashDigestLength: 5,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // resolve: {
  //   fallback: {
  //     crypto: require.resolve('crypto-browserify')
  //   },
  //   alias: {
  //     process: 'process/browser',
  //     browser: 'crypto-browserify'
  //   }
  // },
  externals: {},
  context: __dirname,
  target: 'web',
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
     },
    https:{
    cert: './localhost.crt',
    key: './localhost.key',
    },
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    client:{
      overlay: true,
    },
    
    historyApiFallback: false,
    //disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': https
        ? 'https://0.0.0.0:3000'
        : 'http://0.0.0.0:3000',
      'Cross-Origin-Embedder-Policy': disableCORP ? '' : 'require-corp',
      'Cross-Origin-Opener-Policy': disableCORP ? '' : 'same-origin'
    },
    open: 'index.html'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_ENV': JSON.stringify('development')
    })
  ]
};
