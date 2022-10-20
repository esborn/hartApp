module.exports = {
    entry: "./src/app/app.js",

    output: {
        filename: "core.js"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.json/,
                loader: "json"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file?name=img/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=../fonts/[name].[ext]'
            }
        ]
    },

    resolve: {
        extensions: ["", ".js"]
    }
};