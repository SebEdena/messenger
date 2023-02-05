/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = (options, webpack) => {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'swc-loader',
            options: {
              // This makes swc-loader invoke swc synchronously.
              sync: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  legacyDecorator: true,
                  decoratorMetadata: true,
                },
              },
            },
          },
        },
      ],
    },
  };
};
