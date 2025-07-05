/**
 * anneng-uniapp-dev-tools 使用示例
 */

// ES模块方式
import { devTools, devToolsConfig } from 'anneng-uniapp-dev-tools';
import Vue from 'vue';

// 基础使用
Vue.use(devTools, devToolsConfig);

// 自定义配置
Vue.use(devTools, {
  ...devToolsConfig,
  status: true, // 开启调试工具
  route: '/devTools/page/index',
  bubble: {
    status: true,
    text: "调试",
    color: "#ffffff",
    bgColor: "rgba(250, 53, 52,0.7)",
  },
  console: {
    status: true,
    isOutput: true,
    cache: {
      status: true,
      size: 1024,
      rowSize: 10,
    },
  },
  error: {
    status: true,
    cache: {
      status: true,
      size: 1024,
      rowSize: 10,
    },
  },
  network: {
    status: true,
    cache: {
      status: true,
      size: 1024,
      rowSize: 10,
    },
  },
  logs: {
    status: true,
    cache: {
      status: true,
      size: 1024,
      rowSize: 1,
    },
  },
  pageStatistics: {
    status: true,
    size: 500,
    dayOnlineRowMax: 50,
  },
  uniBus: {
    status: true,
    cache: {
      status: true,
      size: 1024,
      rowSize: 10,
      countMaxSize: 1024,
    },
  },
});

// CommonJS方式
const { devTools: devToolsCJS, devToolsConfig: devToolsConfigCJS } = require('anneng-uniapp-dev-tools');
const VueCJS = require('vue');

VueCJS.use(devToolsCJS, devToolsConfigCJS);

// 获取配置信息
console.log('默认配置:', devToolsConfig);
console.log('页面配置:', devTools.getPageConfig());
console.log('页面路径:', devTools.getPagePath());

// 动态控制调试工具
// 开启调试工具
devTools.setStatus(true);

// 关闭调试工具
devTools.setStatus(false);

// 获取当前状态
const isEnabled = devTools.getStatus();
console.log('调试工具状态:', isEnabled); 