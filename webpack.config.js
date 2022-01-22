const { VueLoaderPlugin } = require('vue-loader');　　　　//追加

module.exports = {
  entry:'./src/index.ts',
  mode: 'development',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  resolve:{　　　　　　　　　　　　　　　　　　//追加
    extensions: [".vue", ".js", ".ts"],
  },
  module:{
    rules:[
      {
        test: /\.css$/i,
        use: ["style-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },      
      {　　　　　　　　　　　　　　　　　　　　
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {　　　　　　　　　　　　　　　　　　　　
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()　　　　　　　　　　　//追加
  ],
}