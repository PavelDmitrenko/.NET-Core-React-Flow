// node-sass: provides binding for Node.js to LibSass, a Sass compiler.
// sass-loader: is a loader for Webpack for compiling SCSS / Sass files.
// style-loader: injects our styles into our DOM.
// css-loader: interprets @import and @url() and resolves them.
// mini-css-extract-plugin: extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.

const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development',
    entry: { 'main': './ClientApp/App.jsx' },
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"],
        alias: {
            // Also update .flowconfig and jsconfig.json
            "Components": path.resolve(__dirname, './ClientApp/Components'),
            "Styles": path.resolve(__dirname, './ClientApp/Styles')
        }
    },
    devServer: {
        hot: true
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {

        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env', "@babel/preset-flow"],
                    }
                }
            },
            {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    isDevelopment ? 'style-loader' : miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    isDevelopment ? 'style-loader' : miniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        // Extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds.
        new miniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
    ]
};