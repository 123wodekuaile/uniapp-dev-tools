import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return [
    // ES Module 构建
    {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.esm.js',
        library: {
          type: 'module'
        },
        globalObject: 'this',
        clean: true
      },
      experiments: {
        outputModule: true
      },
      externals: {
        vue: 'vue'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: 'defaults',
                    modules: false
                  }]
                ]
              }
            }
          }
        ]
      },
      devtool: isProduction ? 'source-map' : 'eval-source-map'
    },
    // CommonJS 构建
    {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.cjs',
        library: {
          type: 'commonjs2'
        },
        globalObject: 'this'
      },
      externals: {
        vue: 'vue'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    targets: 'defaults',
                    modules: 'commonjs'
                  }]
                ]
              }
            }
          }
        ]
      },
      devtool: isProduction ? 'source-map' : 'eval-source-map'
    }
  ];
}; 