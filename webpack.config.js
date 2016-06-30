module.exports = {
    entry: "./app/static/js/Main.js",
    output: {
        filename: "app/static/build/client.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                   presets: ['es2015', 'react'],
                   plugins:['react-html-attrs', 'transform-class-properties']
                }
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
}