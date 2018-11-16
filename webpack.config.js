const path = require('path');

module.exports = {
    entry: {
        chat: './webapp/static/scripts/jsx/chat.js',
        clock: './webapp/static/scripts/jsx/clock.js',
        password: './webapp/static/scripts/jsx/password.js'
    },
    output: {
        // path: path.resolve(__dirname, '/webapp/static/scripts/js'),
        // path: path.resolve('C:/Users/Yajana/Documents/Github/perfui/webapp/static/scripts/js'),
        path: path.resolve('./webapp/static/scripts/js'),
        // C:\Users\Yajana\Documents\GitHub\perfui\webapp\static\scripts\js\chat.js
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    }
}