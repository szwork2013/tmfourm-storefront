var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'src/www');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  //Entry point to the project
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.jsx')
  ],
  //Webpack config options on how to obtain modules
  resolve: {
    //When requiring, you don't need to add these extensions
    extensions: ["", ".js", ".jsx"],
    //Modules will be searched for in these directories
    modulesDirectories: [
      "node_modules",
      path.resolve(__dirname, "node_modules")
    ]
  },
  //Configuration for dev server
  devServer: {
    contentBase: 'src/www',
    devtool: 'sourcemap',
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true
  },
  devtool: 'sourcemap',
  //Output file config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'  //Name of output file
  },
  plugins: [
    //Used to include index.html in build folder
    new HtmlWebpackPlugin({
        inject: false,
        template: path.join(__dirname, '/src/www/index.html')
    }),
    //Allows for sync with browser while developing (like BorwserSync)
    new webpack.HotModuleReplacementPlugin(),
    //Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin()
  ],
  module: {
    //eslint loader
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader'
      }
    ],
    //Allow loading of non-es5 js files.
    loaders: [
      {
        test: /\.(jsx)$/, //All .js and .jsx files
        loaders: ['react-hot','babel-loader?optional=runtime&stage=0'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]  //exclude node_modules so that they are not all compiled
      },
      {
        test: /\.js$/, //All .js and .jsx files
        loader:'babel-loader?optional=runtime&stage=0', //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]  //exclude node_modules so that they are not all compiled
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};

module.exports = config;
