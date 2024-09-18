const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { title } = require("process");

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
    new HtmlWebpackPlugin({
      title: "About Me",
      template: "./src/about-me.html",
      filename: "about-me.html",
    }),

    new HtmlWebpackPlugin({
      title: "Concept",
      template: "./src/concept.html",
      filename: "concept.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource", // Correctly included in the module.rules array
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
