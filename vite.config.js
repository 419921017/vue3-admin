// const path = require('path');
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteRequireContext from "@originjs/vite-plugin-require-context";

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),ViteRequireContext()],
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
    preprocessorOptions :{
      scss: {
        charset: false
      }
    }
  },
  build: {
    assetsInlineLimit: 10240,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vuex', 'element-plus']
        }
      }
    }
  }
});
