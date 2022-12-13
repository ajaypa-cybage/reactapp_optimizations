const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
          console.log(webpackConfig.optimization.splitChunks)
        if (env !== 'development') {
          const htmlWebpackPluginInstance = webpackConfig.plugins.find(
            webpackPlugin => webpackPlugin instanceof HtmlWebpackPlugin
          );
          if (htmlWebpackPluginInstance) {
            htmlWebpackPluginInstance.userOptions.scriptLoading = 'module';
          }
        }
        webpackConfig.optimization.splitChunks = {
          ...webpackConfig.optimization.splitChunks,
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
              base: {
                  // Basic framework
                  chunks: 'all',
                  test: /(react|react-dom|react-dom-router)/,
                  name: 'base',
                  priority: 100,
              },
              d3: {
                  test: /(d3)/,
                  name: 'd3',
                  priority: 100,
              },
              commons: {
                  chunks: 'all',
                  // Pack the modules shared by more than two chunk s into the commons group.
                  minChunks: 2,
                  name: 'commons',
                  priority: 80,
              },
          },
      };
        return webpackConfig;
      },
    },
  };