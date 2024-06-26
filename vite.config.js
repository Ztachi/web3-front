/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-01-02 21:26:26
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-21 22:37:09
 * @Description:
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default () => {
  const version = `v${require('./package.json').version}`;

  return defineConfig({
    plugins: [
      svgr(),
      nodePolyfills(),
      react(),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{js,jsx}"',
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            version,
          },
        },
        minify: true,
      }),
    ],
    server: {
      port: 7000,
      open: true,
      proxy: {
        '/api': {
          target: process.env.SERVER_URL,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/css/_variables.scss";',
        },
      },
    },
    resolve: {
      //配置路径简称
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  });
};
