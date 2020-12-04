const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	// mode: 'production',
	entry: "./src/index.tsx",

	output: {
		path: path.resolve(__dirname, "public")
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({ filename: "main.[chunkhash].css" }),
		new HtmlWebpackPlugin({ template: "src/index.html" })
	],

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: "ts-loader",
				include: [path.resolve(__dirname, "src")],
				exclude: [/node_modules/]
			},
			{
				test: /.(scss|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",

						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},

	optimization: {
		minimizer: [new TerserPlugin()],

		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: "async",
			minChunks: 1,
			minSize: 30000,
			name: false
		}
	}
};
