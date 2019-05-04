var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
      },
   output:{
       path: path.resolve(__dirname, './public'),   
       publicPath: '/public/',
       filename: "[name].js"  
   },
   resolve: {
    extensions: ['.ts', '.js', '.html']

  },
   module:{
       rules:[ 
           {
               test: /\.ts$/, 
               use: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                  } ,
                   'angular2-template-loader'
               ]
            },
            {
                test: /\.html$/, 
                loader: 'raw-loader',
                exclude: [/node_modules\/(?!(ng2-.+))/, path.resolve(__dirname, 'index.html')]
            },
            {
              test: /\.(css)$/,
              exclude: path.resolve(__dirname, 'src/app'),
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true,
                    sourceMap: true
                  }
                },
              ]
            },
            {
              test: /\.(css|sass|scss)$/,
              exclude: [/node_modules\/(?!(ng2-.+))/, path.resolve(__dirname, 'index.html')],
              loaders: ['raw-loader', 'sass-loader']
            }
       ]
   },
   plugins: [
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, 'src'), 
      {} 
    ),       
    new UglifyJSPlugin()
  ]
}