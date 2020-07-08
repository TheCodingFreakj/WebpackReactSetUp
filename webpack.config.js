const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[chunkhash].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
    ],
  },

  resolve: { extensions: ["*", ".js", ".jsx"] },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),

    new CleanWebpackPlugin({
      protectWebpackAssets: true,
      cleanAfterEveryBuildPatterns: ["build/*.*"],
    }),
  ],
};
