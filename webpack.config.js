const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, "docs"),
    filename: "index.js"
  },
  entry: path.join(__dirname, "docs", "App.tsx"),
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "awesome-typescript-loader" },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "docs")
  }
};
