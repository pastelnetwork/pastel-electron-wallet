const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

// TODO figure out how to load assets with file-loader. Currently, they are being resolved in a wrong folder, and this is why URL-loader whould be a quick and dirty solution.
rules.push({
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: "url-loader",
      // options: {
      //   name: "[name].[ext]",
      //   outputPath: "fonts/",
      // },
    },
  ],
});

// TODO figure out how to load assets with file-loader. Currently, they are being resolved in a wrong folder, and this is why URL-loader whould be a quick and dirty solution.
rules.push({
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: "url-loader",
    },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
