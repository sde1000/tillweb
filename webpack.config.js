const path = require('path');
const autoprefixer = require('autoprefixer');
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
    ],
    module: {
	rules: [
	    {
		test: /\.css$/i,
		use: [
		    MiniCssExtractPlugin.loader,
		    "css-loader"],
	    },
	    {
		test: /\.(scss)$/,
		use: [
		    MiniCssExtractPlugin.loader,
		    {
			// Interprets `@import` and `url()` like
			// `import/require()` and will resolve them
			loader: 'css-loader'
		    },
		    {
			// Loader for webpack to process CSS with PostCSS
			loader: 'postcss-loader',
			options: {
			    postcssOptions: {
				plugins: [
				    autoprefixer
				]
			    }
			}
		    },
		    {
			// Loads a SASS/SCSS file and compiles it to CSS
			loader: 'sass-loader',
			options: {
			    sassOptions: {
				// Silence Sass deprecation warnings. May
				// be fixed in a later version of Bootstrap.
				silenceDeprecations: [
				    'if-function',
				    'color-functions',
				    'global-builtin',
				    'import'
				]
			    }
			}
		    },
		],
	    },
	],
    },
    // AMD must be disabled for datatables to work
    amd: {
	"datatables.net": false,
	"datatables.net-bs5": false,
    },
    performance: {
	hints: false,
    },
    devtool: "source-map",
};
