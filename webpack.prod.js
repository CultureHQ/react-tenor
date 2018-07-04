module.exports = {
  output: {
    libraryTarget: "umd"
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }]
  },
  target: "node",
  mode: "production"
};
