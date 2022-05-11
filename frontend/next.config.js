/** @type {import('next').NextConfig} */


const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        if (ANALYZE) {
         config.plugins.push(
           new BundleAnalyzerPlugin({
             analyzerMode: 'server',
             analyzerPort: isServer ? 8888 : 8889,
             openAnalyzer: true,
           })
         )
        }
        return config
      },
  }

  module.exports ={
      images:{
          domains:['leonardo.osnova.io','localhost']
      }
  }

