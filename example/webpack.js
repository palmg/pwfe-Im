const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        bundle: './demo.js',
        vendor: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] }
            }],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local][hash:base64:8]',
                {
                    loader:'postcss-loader',
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')()
                            ];
                        }
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|svg)$/,
            use:['url-loader?limit=25000']
        }, {
            test: /\.html$/,
            use: ['html-loader?minimize=false']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: path.resolve(__dirname, './index.tpl.html'),
        }),
    ]
}
