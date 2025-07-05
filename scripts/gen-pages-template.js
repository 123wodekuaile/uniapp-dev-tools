#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 生成 pages.json 文件
 * 自动合并宿主项目配置和npm包页面配置
 */
function generatePagesJson() {
  console.log('🚀 开始生成 pages.json...');
  
  try {
    // 1. 读取宿主项目的基础配置
    const baseConfigPath = path.resolve(process.cwd(), 'src/pages.json');
    if (!fs.existsSync(baseConfigPath)) {
      console.error('❌ 未找到 src/page.json 文件');
      console.log('💡 请创建 src/page.json 文件，包含你的页面配置');
      return;
    }
    
    const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));
    console.log('✅ 读取基础配置成功');
    
    // 2. 读取npm包中的页面配置
    const devToolsConfigPath = path.resolve(process.cwd(), 'node_modules/anneng-uniapp-dev-tools/page/pageConfig.json');
    let devToolsConfig = null;
    
    if (fs.existsSync(devToolsConfigPath)) {
      devToolsConfig = JSON.parse(fs.readFileSync(devToolsConfigPath, 'utf8'));
      console.log('✅ 找到调试工具页面配置');
    } else {
      console.log('⚠️  未找到调试工具页面配置，跳过');
    }
    
    // 3. 合并配置
    const finalConfig = { ...baseConfig };
    
    // 确保 subPackages 存在
    if (!finalConfig.subPackages) {
      finalConfig.subPackages = [];
    }
    
    // 添加调试工具页面配置
    if (devToolsConfig) {
      // 检查是否已存在
      const exists = finalConfig.subPackages.some(pkg => pkg.root === devToolsConfig.root);
      if (!exists) {
        finalConfig.subPackages.push(devToolsConfig);
        console.log('✅ 已添加调试工具页面配置');
      } else {
        console.log('⚠️  调试工具页面配置已存在，跳过');
      }
    }
    
    // 4. 写入最终配置文件
    const outputPath = path.resolve(process.cwd(), 'src/pages.json');
    fs.writeFileSync(outputPath, JSON.stringify(finalConfig, null, 2));
    
    console.log('✅ pages.json 生成完成:', outputPath);
    console.log('📊 配置统计:');
    console.log(`   - 主包页面: ${finalConfig.pages.length} 个`);
    console.log(`   - 分包数量: ${finalConfig.subPackages.length} 个`);
    
  } catch (error) {
    console.error('❌ 生成失败:', error.message);
  }
}

// 运行生成
generatePagesJson(); 