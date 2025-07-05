# 项目配置示例

## 1. 项目结构

```
my-uniapp-project/
├── src/
│   ├── pages.base.json     # 基础页面配置（手动维护）
│   ├── pages.json          # 最终页面配置（自动生成）
│   ├── main.js
│   └── pages/
│       └── index/
│           └── index.vue
├── devTools/               # 调试工具页面（自动复制）
│   └── page/
│       ├── index.nvue
│       ├── components/
│       └── static/
├── gen-pages.js            # 生成脚本（自动创建）
├── package.json
└── node_modules/
    └── anneng-uniapp-dev-tools/
```

## 2. 配置步骤

### 步骤1：安装包
```bash
npm install anneng-uniapp-dev-tools
```

### 步骤2：初始化项目
```bash
npx anneng-uniapp-dev-tools init
```

这会创建：
- `gen-pages.js` - 生成脚本
- `src/pages.base.json` - 基础配置模板

### 步骤3：配置 package.json
```json
{
  "name": "my-uniapp-project",
  "version": "1.0.0",
  "scripts": {
    "gen-pages": "node gen-pages.js",
    "dev": "npm run gen-pages && uni-app dev",
    "build": "npm run gen-pages && uni-app build",
    "dev:h5": "npm run gen-pages && uni-app dev:h5",
    "dev:mp-weixin": "npm run gen-pages && uni-app dev:mp-weixin",
    "build:h5": "npm run gen-pages && uni-app build:h5",
    "build:mp-weixin": "npm run gen-pages && uni-app build:mp-weixin"
  },
  "dependencies": {
    "anneng-uniapp-dev-tools": "^1.0.0"
  }
}
```

### 步骤4：维护基础配置
编辑 `src/pages.base.json`：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/user/user",
      "style": {
        "navigationBarTitleText": "用户中心"
      }
    }
  ],
  "subPackages": [
    {
      "root": "pages/sub",
      "pages": [
        {
          "path": "detail/detail",
          "style": {
            "navigationBarTitleText": "详情页"
          }
        }
      ]
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "我的应用",
    "backgroundColor": "#F8F8F8"
  }
}
```

### 步骤5：生成最终配置
```bash
npm run gen-pages
```

这会生成 `src/pages.json`：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/user/user",
      "style": {
        "navigationBarTitleText": "用户中心"
      }
    }
  ],
  "subPackages": [
    {
      "root": "pages/sub",
      "pages": [
        {
          "path": "detail/detail",
          "style": {
            "navigationBarTitleText": "详情页"
          }
        }
      ]
    },
    {
      "root": "devTools/page",
      "name": "devToolsPage",
      "pages": [
        {
          "path": "index",
          "style": {
            "navigationStyle": "custom"
          }
        }
      ]
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "我的应用",
    "backgroundColor": "#F8F8F8"
  }
}
```

### 步骤6：引入调试工具
在 `src/main.js` 中：

```javascript
import Vue from 'vue';
import App from './App.vue';
import { devTools, devToolsConfig } from 'anneng-uniapp-dev-tools';

// 使用调试工具
Vue.use(devTools, {
  ...devToolsConfig,
  status: true, // 开启调试工具
  route: '/devTools/page/index'
});

Vue.config.productionTip = false;

const app = new Vue({
  ...App
});

app.$mount();
```

## 3. 开发流程

### 日常开发
1. 在 `src/pages.base.json` 中添加新页面
2. 运行 `npm run gen-pages` 生成配置
3. 运行 `npm run dev` 启动开发

### 构建发布
1. 运行 `npm run gen-pages` 确保配置最新
2. 运行 `npm run build` 构建项目

## 4. 注意事项

1. **不要直接编辑 `src/pages.json`**，它会被自动生成覆盖
2. **在 `src/pages.base.json` 中维护你的页面配置**
3. **每次添加新页面后都要运行 `npm run gen-pages`**
4. **调试工具页面会自动添加到分包中**
5. **可以通过 `devTools.setStatus(false)` 在生产环境关闭调试工具**

## 5. 故障排除

### 问题1：页面配置不生效
- 检查是否运行了 `npm run gen-pages`
- 检查 `src/pages.base.json` 格式是否正确

### 问题2：调试工具页面无法访问
- 检查 `devTools/page` 目录是否存在
- 检查 `pages.json` 中是否包含调试工具配置
- 检查路由配置是否正确

### 问题3：生成脚本报错
- 检查 `src/pages.base.json` 是否存在
- 检查 JSON 格式是否正确
- 检查文件权限是否正确 