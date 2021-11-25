const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        index: './src/index.ts',
        convertToTensor: './src/CarsMpgPredict/convertToTensor.ts',
        createModel: './src/CarsMpgPredict/createModel.ts',
        getData: './src/CarsMpgPredict/getData.ts',
        runScatterPlot: './src/CarsMpgPredict/runScatterPlot.ts',
        testModel: './src/CarsMpgPredict/testModel.ts',
        trainModel: './src/CarsMpgPredict/trainModel.ts',
    },
    devtool: 'inline-source-map',
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new Dotenv({ path: './.env' })
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};