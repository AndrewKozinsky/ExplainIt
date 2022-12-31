const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function () {
	const env = process.env

	// Режим разработки
	const isDev = env.NODE_ENV !== 'production'

	return {
		entry: './src/index.tsx',
		mode: isDev ? 'development' : 'production',
		module: {
			rules: [
				parseJS(),
				parseCSS( isDev ),
				parseAssets()
			]
		},
		devtool: getDevTool( isDev ),
		resolve: getResolve(),
		devServer: getDevServerSettings(parseInt(env.PORT)),
		plugins: getPlugins( isDev ),
		output: {
			path: path.resolve( __dirname, 'dist' ),
			filename: 'main.js',
			assetModuleFilename: 'images/[hash][ext][query]'
		},
	}
}

// Функция возвращает настройки загрузчика для JavaScript
function parseJS() {
	return {
		test: /\.(ts|js)x?$/,
		use: [{ loader: 'babel-loader' }],
		exclude: /node_modules/,
	}
}

// Функция возвращает настройки загрузчика для CSS
function parseCSS(isDev) {
	if( isDev ) {
		return {
			test: /\.s?css$/i,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		}
	}
	else {
		return {
			test: /\.s?css$/i,
			use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
		}
	}
}

// Функция возвращает настройки загрузчика других типов файлов
function parseAssets() {
	return {
		test: /\.(png|jpg|jpeg|gif|woff2|pdf)$/i,
		type: 'asset/resource',
	}
}

// Функция возвращает значение параметра devtools
function getDevTool(isDev) {
	return isDev ? 'inline-source-map' : false // eval
}

// Функция возвращает объект для свойства resolve
function getResolve() {
	return {
		// Почему-то без этой настройки TypeScript не работает
		extensions: ['.tsx', '.ts', '.jsx', '.js', '.png', '.woff2'],
		modules: ['node_modules'],
		alias: {
			src:      path.resolve(__dirname, './src'),
			requests: path.resolve(__dirname, './src/requests'),
			services:    path.resolve(__dirname, './src/services'),
			store:    path.resolve(__dirname, './src/store'),
			types:    path.resolve(__dirname, './src/types'),
			utils:    path.resolve(__dirname, './src/utils'),
		}
	}
}

// Функция возвращает значение параметра devtools
function getDevServerSettings(port) {
	return {
		compress: true,
		port,
		host: '0.0.0.0',
		historyApiFallback: true,
		allowedHosts: 'all',
		hot: false,
		client: {
			webSocketURL: 'auto://0.0.0.0:0/admin/ws'
		},
	}
}

// Функция возвращающая массив plugins
function getPlugins(isDev) {
	if (isDev) {
		return [
			// Очистка папки с компилированными файлами перед помещением других
			new CleanWebpackPlugin(),
			// Формирование index.html
			new HtmlWebpackPlugin(getHtmlConfig()),
			// Передача в Реакт переменной окружения. По какой-то причине я не смог передать строку.
			// new webpack.DefinePlugin({ 'process.env.isDev': isDev })
		]
	}
	else {
		return [
			// Формирование index.html
			new HtmlWebpackPlugin(getHtmlConfig()),
			// Формирование файлов CSS из строковых стилей
			/*new MiniCssExtractPlugin({
                filename: 'main-[fullhash:6].css'
            })*/
		]
	}
}

// Функция возвращающая объект с настройками HtmlWebpackPlugin
function getHtmlConfig() {
	return {
		title: 'Администрация',
		template: './static/template.html',
		favicon: './static/favicon2x.png'
	}
}
