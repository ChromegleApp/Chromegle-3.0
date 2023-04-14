const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const fs = require('fs');


/**
 * Dynamically parse .ts -> .js and modify manifest.json
 */
function dynamicEntries(entries = {}) {
    const manifestFile = fs.readFileSync("public/manifest.json").toString();
    const manifest = JSON.parse(manifestFile);
    manifest?.content_scripts?.[0]?.js.splice(0, manifest?.content_scripts?.[0]?.js.length);

    // Update project
    for (let file of glob.sync(`${__dirname}/src/**/*.*`)) {
        const newFileName = file
            .replace(__dirname, '')
            .replaceAll("\\", "/");

        entries[newFileName.substring(0, newFileName.lastIndexOf("."))] = path.resolve(file);
        const remappedJsFileName = newFileName.replace(".ts", ".js");

        // Depending on type of file
        if (newFileName.includes("main")) manifest?.content_scripts?.[0]?.js.push(remappedJsFileName);
        else manifest?.content_scripts?.[0]?.js.unshift(remappedJsFileName);
    }

    // Update manifest
    fs.writeFileSync("public/manifest.json", JSON.stringify(manifest, null, 2));
    return entries;
}

module.exports = {
    mode: "production",
    entry: dynamicEntries(),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: ".", to: ".", context: "public"},
            ]
        }),
    ],
};
