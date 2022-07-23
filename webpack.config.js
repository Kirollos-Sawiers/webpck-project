const pathM = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "script.bundle.js",
        path: pathM.resolve(__dirname, "build"),
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({template:"./src/index.html"}),
        new MiniCssExtractPlugin({filename:"style.bundle.css"}),
        new CssMinimizerPlugin()
    ],
    optimization: {
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["mozjpeg", { quality: 60 }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            convertShapeToPath: {
                                                convertArcs: true
                                            },
                                            convertPathData: false
                                        }
                                    }
                                }
                            ],
                        ],
                    },
                },
            }),
        ],
    }

}