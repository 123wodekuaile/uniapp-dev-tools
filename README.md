# anneng-uniapp-dev-tools

支持 Vue2+Vue3 的跨平台调试工具

## 安装

```bash
npm install anneng-uniapp-dev-tools
```

## 使用方法

### ES模块方式

```javascript
import { devTools, devToolsConfig } from 'anneng-uniapp-dev-tools';
import Vue from 'vue';

// 使用默认配置
Vue.use(devTools, devToolsConfig);

// 或者自定义配置
Vue.use(devTools, {
  ...devToolsConfig,
  status: true, // 开启调试工具
  route: '/devTools/page/index'
});
```

### CommonJS方式

```javascript
const { devTools, devToolsConfig } = require('anneng-uniapp-dev-tools');
const Vue = require('vue');

Vue.use(devTools, devToolsConfig);
```

## 配置说明

### devToolsConfig 默认配置

```javascript
{
  version: 3.81,
  status: false, // 调试工具总开关
  route: "/devTools/page/index", // 调试页面的路由
  bubble: { // 调试弹窗气泡设置
    status: false, // 气泡标签是否显示
    text: "调试工具", // 气泡上展示的文字
    color: "#ffffff", // 气泡文字颜色
    bgColor: "rgba(250, 53, 52,0.7)", // 气泡背景颜色
  },
  console: {
    status: true, // 开关
    isOutput: true, // 打印的日志是否对外输出
    cache: {
      status: true, // 是否启用console缓存
      size: 512, // 缓存大小
      rowSize: 5.12, // 行大小
    },
  },
  error: {
    status: true,
    cache: {
      status: true,
      size: 512,
      rowSize: 5.12,
    },
  },
  network: {
    status: true,
    cache: {
      status: true,
      size: 512,
      rowSize: 5.12,
    },
  },
  logs: {
    status: true,
    cache: {
      status: true,
      size: 512,
      rowSize: 0.4,
    },
  },
  pageStatistics: {
    status: true, // 统计状态开关
    size: 200,
    dayOnlineRowMax: 30, // 日活跃时间的保存条数
  },
  uniBus: {
    status: true,
    cache: {
      status: true,
      size: 512,
      rowSize: 5.12,
      countMaxSize: 512, // bus统计上限
    },
  },
}
```

## 功能特性

- 支持 Vue2 和 Vue3
- 跨平台支持（H5、APP、小程序）
- Console 日志记录
- 错误监控和报告
- 网络请求监控
- 页面统计
- 文件系统管理
- 存储管理
- 路由管理
- 实时调试

## 版本信息

当前版本：v1.0.0

更新日期：2025.1.27

## 许可证

MIT 