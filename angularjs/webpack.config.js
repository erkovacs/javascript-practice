const path = require("path");

module.exports = {
    entry: {
        app: "./src/app.js"
    },
    output: {
        path : path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.html$/, loader: "html-loader" },
        ]
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
          "node_modules",
          path.resolve(__dirname, "app")
        ],
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css"],
    }
}