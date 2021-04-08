const path = require('path');

const config = {
  projectName: 'taro3_vant',
  date: '2020-10-14',
  designWidth: 750,
  deviceRatio: {
    375: 1 / 2,
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'build',
  plugins: [
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ]
  },
  alias: {
    components: path.resolve(__dirname, '..', 'src/components'),
    models: path.resolve(__dirname, '..', 'src/models'),
    utils: path.resolve(__dirname, '..', 'src/utils'),
    package: path.resolve(__dirname, '..', 'package.json'),
  },
  framework: 'react',
  mini: {
    enableExtract: true,
    miniCssExtractPluginOption: {
      //忽略css文件引入顺序
      ignoreOrder: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    router: {
      mode: 'hash',
      customRoutes: {
        '/pages/index/index': '/'
      }
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

if (process.env.TARO_BUILD_TYPE === 'ui') {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  });

  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin');
    chain.plugins.delete('addAssetHtmlWebpackPlugin');
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'taro-list-view'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        weui: 'commonjs2 weui'
      }
    });
  };
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}