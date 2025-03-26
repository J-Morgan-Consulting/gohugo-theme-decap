const path = require("path");

module.exports = {
  entry: {
    decap: "./themes/decap/static/js/decap.js",
    "decap-auth": "./themes/decap/static/js/decap-auth.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "static/dist"),
    library: {
      type: "module", // Ensure the output is an ES module
    },
  },
  experiments: {
    outputModule: true, // Enable module output support
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
