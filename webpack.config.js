var path = require("path");
const WebpackMd5Hash = require('webpack-md5-hash'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	webpack = require('webpack'),
	UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
	Visualizer = require('webpack-visualizer-plugin'),
	AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

const devPlugin = [
// new LiveReloadPlugin(),
// new webpack.HotModuleReplacementPlugin(),
	new HtmlWebpackPlugin({
		template: './app/index.html',
		filename: publicPath + '/index.html',
		inject: true
	}),
	new WebpackMd5Hash(),
	new ExtractTextPlugin('styles.css'),
]

var commonLoaders =  [{
		test: /\.js$/,
		include: [
			path.resolve(__dirname, "app"),
			path.resolve(__dirname, "server"),
		],
		loader: "jsx-loader"
	},{
		test: /\.js|.jsx$/,
		include: [
			path.resolve(__dirname, "app")
		],
		use:[{
			loader: 'babel-loader',
			options: {
			  "plugins": [
				"transform-decorators-legacy",
				"transform-class-properties",
				"transform-object-assign",
				"transform-object-rest-spread",
				"transform-runtime"
			  ],
			  "presets": ['env', "es2015", "react", "es2017"]
			}
		}]
	}, {
		test: /\.css/,
		use:[{
			loader: "css-loader"
		}]
	}, {
		test: /\.less/,
		use: ExtractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: 'css-loader!less-loader'
	    })
	},
	// "file" loader makes sure those assets end up in the `build` folder.
	// When you `import` an asset, you get its filename.
	{
		test: /\.(ico|jpg|jpeg|png|gif|otf|webp)(\?.*)?$/,
		loader: 'file-loader',
		options: {
			name: 'static/media/[name].[ext]'
		}
	},
	// "url" loader works just like "file" loader but it also embeds
	// assets smaller than specified size as data URLs to avoid requests.
	{
		test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
		loader: 'url',
		options: {
			limit: 10000,
			name: '/static/media/[name].[chunkhash:8].[ext]'
		}
	}, {
		test: /\.woff(2)?(\?.*)?$/,
		loader: 'url-loader',
		options: {
			name: '/static/media/[name].[ext]'
		}
	}, {
		test: /\.(ttf|eot|svg)(\?.*)?$/,
		loader: 'file-loader',
		options: {
			name: '/static/media/[name].[ext]'
		}
	}
]

module.exports = [
	{
		// The configuration for the client
		name: "browser",
		entry: "./app/entry.js",
		output: {
			path: assetsPath,
			filename: "[hash].js",
			publicPath: publicPath
		},
		module: {
	        rules: commonLoaders
	    },
		plugins: [
			...devPlugin,
			function(compiler) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(__dirname, "server", "stats.generated.json"), JSON.stringify(stats.toJson()));
				});
			}
		]
	},
	{
		// The configuration for the server-side rendering
		name: "server-side rendering",
		entry: "./server/page.js",
		target: "node",
		output: {
			path: assetsPath,
			filename: "../../server/page.generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		resolve: {
	        extensions: [ '.js', '.jsx', 'es6'],
	        modules: [
	            path.resolve('./app/'),
				path.resolve('./node_modules')
	        ]
	    },
		plugins: [
			...devPlugin,
			function(compiler) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(__dirname, "server", "stats.generated.json"), JSON.stringify(stats.toJson()));
				});
			}
		],
		externals: /^[a-z\-0-9]+$/,
		module: {
			rules: commonLoaders
		}
	}
];
