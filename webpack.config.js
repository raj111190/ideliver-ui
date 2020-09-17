/** This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
// generated on 2018-01-10 using generator-openmrs-owa 0.6.0

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const env = require('yargs').argv.env;
const target = require('yargs').argv.target;
const targetPort = require('yargs').argv.targetPort;

const UglifyPlugin = webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModulesDir = path.resolve(__dirname, '../node_modules');

const THIS_APP_ID = 'ideliver.ui';

const plugins = [];
const nodeModules = {};

let outputFile = '.bundle';
let vendorOutputFile;
let outputPath;

let configJson;
let appEntryPoint;
let localOwaFolder;

let devtool;

const getConfig = function () {
  let config;

  try {
    // look for config file
    config = require('./config.json');
  } catch (err) {
    // create file with defaults if not found
    config = {
      LOCAL_OWA_FOLDER: '/home/olivier.dusabimana/openmrs/ideliver/owa/',
      APP_ENTRY_POINT: 'http://localhost:8080/openmrs/owa/ideliver.ui/index.html#visits',
    };

    fs.writeFile('config.json', JSON.stringify(config));
  } finally {
    return config;
  }
};
const config = getConfig();

const resolveBrowserSyncTarget = function () {
  if (targetPort != null && targetPort != 'null') {
    return (
        config.APP_ENTRY_POINT.substr(0, 'http://localhost:'.length) +
        targetPort +
        config.APP_ENTRY_POINT.substr(
            'http://localhost:'.length + targetPort.toString().length,
            config.APP_ENTRY_POINT.length,
        )
    );
  }
  return config.APP_ENTRY_POINT;
};
const browserSyncTarget = resolveBrowserSyncTarget();

/** Minify for production */
if (env.prod === true) {
  plugins.push(new UglifyPlugin({
    output: {
      comments: false,
    },
    minimize: true,
    compress: {},
  }));
  outputFile = `${outputFile}.min.[chunkhash].js`;
  vendorOutputFile = 'vendor.bundle.[chunkhash].js';
  outputPath = `${__dirname}/dist/`;
  plugins.push(new WebpackOnBuildPlugin((stats) => {
    // create zip file
    const archiver = require('archiver');
    const output = fs.createWriteStream(`${THIS_APP_ID}.zip`);
    const archive = archiver('zip');

    output.on('close', () => {
      console.log(`distributable has been zipped! size: ${archive.pointer()}`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    archive.directory(`${outputPath}`, '');

    archive.finalize();
  }));
} else if (env.deploy === true) {
  outputFile = `${outputFile}.js`;
  vendorOutputFile = 'vendor.bundle.js';
  outputPath = `${config.LOCAL_OWA_FOLDER}${THIS_APP_ID}`;
  devtool = 'source-map';
} else if (env.dev === true) {
  outputFile = `${outputFile}.js`;
  vendorOutputFile = 'vendor.bundle.js';
  outputPath = `${__dirname}/dist/`;
  devtool = 'source-map';
}

plugins.push(new BrowserSyncPlugin({
  https: true,
  proxy: {
    target: browserSyncTarget,
  },
}));

plugins.push(new CommonsChunkPlugin({
  name: 'vendor',
  filename: vendorOutputFile,
}));

plugins.push(new HtmlWebpackPlugin({
  template: './app/index.html',
  inject: 'body',
}));

plugins.push(new CopyWebpackPlugin([
  {
    from: './app/manifest.webapp',
  },
]));

plugins.push(new CopyWebpackPlugin([
  {
    from: './app/img/',
    to: 'img/',
  },
]));

plugins.push(new ExtractTextPlugin({
  filename: '[name].bundle.min.[chunkhash].css',
}));

const webpackConfig = {
  entry: {
    app: `${__dirname}/app/js/ideliver.ui`,
    vendor: ['react', 'react-router-dom'],
  },
  devtool,
  target,
  output: {
    path: outputPath,
    filename: `[name]${outputFile}`,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)/,
        use: ExtractTextPlugin.extract({
          fallback: { loader:'style-loader', options: { sourceMap: true } }, // creates style nodes from JS strings
          use: [
            {
              loader: 'css-loader',
              options: {
                context: '/',
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            }, // translates CSS into CommonJS
            { loader: 'sass-loader',
              options: {
                sourceMap: true,
                implementation: require("node-sass"),
              }
            }, // compiles Sass to CSS
          ],
          publicPath: '/dist',
        }),
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?name=/fonts/[name].[ext]',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    enforceExtension: false,
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: { react: require.resolve('react') },
  },
  plugins,
  externals: nodeModules,
};

module.exports = webpackConfig;
