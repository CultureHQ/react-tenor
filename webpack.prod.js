/* eslint import/no-extraneous-dependencies: off */
const nodeExternals = require("webpack-node-externals");

module.exports = {
  output: {
    libraryTarget: "umd"
  },
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
  target: "node",
  mode: "production",
  externals: [nodeExternals()]
};
