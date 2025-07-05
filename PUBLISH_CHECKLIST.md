# 发布检查清单

## 发布前检查

### 1. 文件结构检查
- [ ] `dist/` 目录存在且包含构建文件
- [ ] `core/` 目录完整
- [ ] `page/` 目录完整
- [ ] `scripts/` 目录包含生成脚本模板
- [ ] `bin/` 目录包含CLI工具
- [ ] `example/` 目录包含示例文件

### 2. 配置文件检查
- [ ] `package.json` 配置正确
  - [ ] `name` 为 `anneng-uniapp-dev-tools`
  - [ ] `version` 已更新
  - [ ] `bin` 配置正确
  - [ ] `files` 包含所有必要文件
  - [ ] `exports` 配置正确
- [ ] `README.md` 文档完整
- [ ] `.npmignore` 配置正确

### 3. 功能测试
- [ ] CLI工具可执行
- [ ] 生成脚本模板正确
- [ ] 页面配置文件正确
- [ ] 导出变量正确

### 4. 构建测试
```bash
# 清理并重新构建
rm -rf dist/
npm run build

# 检查构建结果
ls -la dist/
```

### 5. 本地测试
```bash
# 打包测试
npm pack

# 检查打包内容
tar -tzf anneng-uniapp-dev-tools-*.tgz | head -20
```

### 6. 发布命令
```bash
# 登录npm（如果需要）
npm login

# 发布
npm publish

# 或者发布到测试环境
npm publish --dry-run
```

## 发布后验证

### 1. 安装测试
```bash
# 创建测试项目
mkdir test-project && cd test-project
npm init -y

# 安装包
npm install anneng-uniapp-dev-tools

# 测试CLI
npx anneng-uniapp-dev-tools --help
npx anneng-uniapp-dev-tools config
```

### 2. 功能验证
```bash
# 测试初始化
npx anneng-uniapp-dev-tools init

# 检查生成的文件
ls -la
cat src/pages.base.json
cat gen-pages.js
```

### 3. 导入测试
```javascript
// 测试ES模块导入
import { devTools, devToolsConfig } from 'anneng-uniapp-dev-tools';
console.log('ES模块导入成功:', !!devTools, !!devToolsConfig);

// 测试CommonJS导入
const { devTools: devToolsCJS, devToolsConfig: devToolsConfigCJS } = require('anneng-uniapp-dev-tools');
console.log('CommonJS导入成功:', !!devToolsCJS, !!devToolsConfigCJS);
```

## 版本更新流程

### 1. 更新版本号
```bash
# 更新package.json中的version
# 例如：1.0.0 -> 1.0.1
```

### 2. 更新CHANGELOG（如果有）
记录本次更新的内容

### 3. 提交代码
```bash
git add .
git commit -m "feat: 添加CLI工具和自动配置功能"
git tag v1.0.1
git push origin main --tags
```

### 4. 发布
```bash
npm publish
```

## 常见问题

### 1. 发布失败
- 检查npm登录状态
- 检查包名是否可用
- 检查版本号是否已存在

### 2. 安装失败
- 检查package.json格式
- 检查files配置
- 检查依赖关系

### 3. CLI工具不工作
- 检查bin配置
- 检查文件权限
- 检查shebang行

### 4. 页面配置不生效
- 检查生成脚本
- 检查文件路径
- 检查JSON格式 