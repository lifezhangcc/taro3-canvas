import { Config } from '@tarojs/taro';

const config: Config = {
  pages: [
    'pages/demo/index',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
};

export default config;