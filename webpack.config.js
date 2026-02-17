const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
	tillweb: "./assets/tillweb.js",
    },
    output: {
	filename: '[name].js',
	path: path.resolve(__dirname, './tillweb/static/bundles'),
	clean: true,
    },
    plugins: [
	new MiniCssExtractPlugin(),
	new webpack.ProvidePlugin({
	    $: "jquery",
	    jQuery: "jquery",
	    jquery: "jquery",
	    'window.jQuery': "jquery",
	    'window.$': "jquery",
	}),
    ],
    resolve: {
	alias: {
	    // Force all modules to use the same jquery version
	    'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery'),
	},
    },
    module: {
	rules: [
	    {
		test: /\.css$/i,
		use: [
		    MiniCssExtractPlugin.loader,
		    "css-loader"],
	    },
	],
    },
    // AMD must be disabled for datatables to work
    amd: {
	"datatables.net": false,
	"datatables.net-bs4": false,
    },
    performance: {
	hints: false,
    },
    devtool: "source-map",
};
