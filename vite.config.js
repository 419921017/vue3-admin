// const path = require('path');
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
// import viteSvgIcons from 'vite-plugin-svg-icons';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 自定义打包的静态目录名称
const mkdirName = 'static';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    ElementPlus(),
    ViteRequireContext(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
      /**
       * custom insert position
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      typings: resolve('src/typings'),
      components: resolve('src/components'),
      styles: resolve('src/styles'),
      store: resolve('src/store'),
      utils: resolve('src/utils'),
      router: resolve('src/router'),
      route: resolve('src/route'),
    },
    extensions: ['.js', '.ts', 'tsx', '.vue', '.json', '.css'],
  },
  css: {
    // * css模块化 文件以.module.[css|less|scss]结尾
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    // * 预编译支持css/less/scss
    preprocessorOptions: {
      css: {
        javascriptEnabled: true,
      },
      less: {
        javascriptEnabled: true,
      },
      scss: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  build: {
    assetsInlineLimit: 10240,
    rollupOptions: {
      input: {
        // 多页面配置， 如果有需求，就在这里配置，如果不需要，可以把 input 这里删除掉
        main: resolve('index.html'),
        // home: resolve("src/home/index.html"),
        // about: resolve("src/about/index.html"),
      },
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vuex', 'element-plus'],
        },
        chunkFileNames: `${mkdirName}/js/[name]-[hash].js`,
        entryFileNames: `${mkdirName}/js/[name]-[hash].js`,
        assetFileNames: `${mkdirName}/[ext]/[name]-[hash].[ext]`,
      },
    },
    assetsDir: mkdirName,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 8888,
    strictPort: true, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    cors: true,
    proxy: {
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        },
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
