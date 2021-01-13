const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

let scriptConfig = {
  entry: ['babel-polyfill', './src/main.ts'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'main.js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        options: {
          rules: {
            esModule: true,
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vuex': 'vuex/dist/vuex.js',
    }
  },
  devServer: {
    open: true,
    openPage: '',
    contentBase: path.join(__dirname, './'),
    watchContentBase: true,
    historyApiFallback: true,
    host: 'localhost',
    disableHostCheck: true,
    port: 3000,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    minimize: false
  }
}

let styleConfig = {
  entry: {
    main: './src/sass/main.scss'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'main.css'
  },
  module: {
    rules: [{
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              url: false
            },
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', { grid: true }]
                ],
              },
            },
          }, {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff2?|svg)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }
      },
    ]
  },
  plugins: [],
  optimization: {
    minimize: false
  }
}

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {

  styleConfig.optimization.minimize = true
  scriptConfig.plugins.push(new MiniCssExtractPlugin())

  scriptConfig.optimization.minimize = true
  scriptConfig.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true
  }))

}

module.exports = [scriptConfig, styleConfig]
