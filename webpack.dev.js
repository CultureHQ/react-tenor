const path = require("path");
const webpack = require("webpack");

module.exports = {
  output: {
    filename: "example.js"
  },
  entry: path.join(__dirname, "example", "app.js"),
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "example")
  },
  mode: "development",
  plugins: [
    new webpack.EnvironmentPlugin(["TOKEN"])
  ]
};
