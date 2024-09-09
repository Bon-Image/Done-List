const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./src/index.html",
      scriptLoading: "defer",
      filename: "index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    fallback: {
      assert: false,
      buffer: false,
      crypto: false,
      stream: false,
      util: false,
      path: false,
      os: false,
      fs: false,
      url: false,
    },
  },
};
