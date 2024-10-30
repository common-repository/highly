const path = require("path");

// Configuration object.
const config = {
  // Create the entry points.

  entry: "./src/js/init.js",
  output: {
    filename: "js/highly-tooltip.js",
    path: path.resolve(__dirname, "dist"),
  },

  // Transpile down to es5
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};

// Export the config object.
module.exports = config;
