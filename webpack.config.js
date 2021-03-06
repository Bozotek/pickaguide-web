const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: ['./client/app.js'],
    output: {
        path: "./assets/build",
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/assets/build/'
    },
    resolve: {
       alias: {
           assets: path.join(__dirname, '/assets'),
           fonts: path.join(__dirname, '/assets/fonts'),
           images: path.join(__dirname, '/assets/images'),
           scss: path.join(__dirname, '/assets/scss'),
           client: path.join(__dirname, '/client'),
           actions: path.join(__dirname, '/client/actions'),
           components: path.join(__dirname, '/client/components'),
           framework: path.join(__dirname, '/client/components/framework'),
           base: path.join(__dirname, '/client/components/framework/base'),
           layout: path.join(__dirname, '/client/components/framework/layout'),
           form: path.join(__dirname, '/client/components/framework/layout/form'),
           view: path.join(__dirname, '/client/components/framework/view'),
           main: path.join(__dirname, '/client/components/main'),
           modals: path.join(__dirname, '/client/components/modals'),
           menu: path.join(__dirname, '/client/components/main/menu'),
           views: path.join(__dirname, '/client/components/views'),
           services: path.join(__dirname, '/client/services'),
           stores: path.join(__dirname, '/client/stores'),
           server: path.join(__dirname, '/server'),
       },
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.s?css$/, loaders: ['style', 'css?sourceMap', 'sass'], exclude: /node_modules/ },
            { test: /\.(png|jpg|ico)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(eot|svg|ttf|woff|woff2|otf)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(mp3)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(jsx?|json)$/,
              loader: 'babel-loader',
              exclude: '/node_modules/',
              query: {
                  presets: ['react', ["es2015", {"modules": false}], "react-hmre"]
              }
           },
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ],
    devServer: {
        proxy: {
            '/': {
                target: `http://localhost:${process.env.PORT || 5000}`,
                secure: false
            }
        }
    }
};
