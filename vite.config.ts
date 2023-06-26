import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "url";
import path from "path";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import banner from "vite-plugin-banner";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import pkg from "./package.json";
//安装jsx插件 npm install @vitejs/plugin-vue-jsx -D
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18n from "@intlify/vite-plugin-vue-i18n";

// md文件预览
import Markdown from "vite-plugin-vue-markdown";
import prism from "markdown-it-prism";
import Pages from "vite-plugin-pages";
import Inspect from "vite-plugin-inspect";

// SvgIcon插件
import { svgBuilder } from "./src/plugins/svgBuilder";

const resolve = (dir: string): string => path.resolve(__dirname, dir);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("当前环境：", env);
  return {
    root: resolve("./"),
    base: "/",
    publicDir: "public",
    server: {
      port: 3077,
      hmr: {
        overlay: true, // 服务器错误显示在页面上
      },
      proxy: {
        // 七牛云代理接口
        "/BaseApi": {
          // 如果接口掉不通会默认返回对应域名地址
          // target: "http://upload.qiniup.com",
          // target: "http://up-cn-east-2.qiniup.com",
          target: "http://up-z0.qiniup.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/BaseApi/, ""),
        },
        // 上传代理
        "/qny": {
          target: "http://127.0.0.1:5000", // node地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/qny/, ""),
        },
        "/fwqBd": {
          target: "http://up-z0.qiniup.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/BaseApi/, ""),
        },
        "/api": {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
        "/gitee": {
          target: "https://gitee.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gitee/, ""),
        },
      },
    },
    resolve: {
      alias: {
        // "@": resolve("src"),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@img": resolve("src/assets/img"),
        "@less": resolve("src/assets/less"),
        "@libs": resolve("src/libs"),
        "@cp": resolve("src/components"),
        "@views": resolve("src/views"),
        // 兼容webpack的静态资源
        "~@": resolve("src"),
        "~@img": resolve("src/assets/img"),
        "~@less": resolve("src/assets/less"),
        "~@libs": resolve("src/libs"),
        "~@cp": resolve("src/components"),
        "~@views": resolve("src/views"),
      },
    },
    css: {
      /**
       * 包括 vw / rem 单位转换等
       * @see https://cn.vitejs.dev/config/#css-postcss
       */
      // postcss: {
      //   plugins: [
      //     // 使用 postcss-px2rem
      //     // px2rem({
      //     //   remUnit: 75,
      //     // }),

      //     // 使用 postcss-px-to-viewport
      //     // px2vw({
      //     //   viewportWidth: 375,
      //     //   minPixelValue: 1,
      //     // }),
      //   ],
      // },

      /**
       * 预处理器选项可以在这里配置
       * @see https://cn.vitejs.dev/config/#css-preprocessoroptions
       */
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "primary-color": "#1890ff",
            hack: `true; @import '@less/config.less'`,
          },
        },
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      Markdown({
        headEnabled: true,
        markdownItUses: [prism],
      }),
      Pages({
        pagesDir: "pages",
        extensions: ["vue", "md"],
      }),
      Inspect(),
      vueJsx(),
      // md预览
      svgBuilder("./src/assets/icons/svg/"), // 导入所有svg
      // https://github.com/intlify/vite-plugin-vue-i18n
      VueI18n({
        include: [resolve(__dirname, "./src/locales/**")],
      }),
      VueSetupExtend(), // * name 可以写在 script 标签上
      // 这里使用注入变量到html文件、会导致其他的html静态页面地址栏访问跳转404路由、暂未找到两者并行的解决办法、（注释能正常访问其他html）
      // createHtmlPlugin({
      //   inject: {
      //     data: {
      //       ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false",
      //     },
      //   },
      // }),
      // 自动引入element
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      env.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
      /**
       * 自动导入组件，不用每次都 import
       * @see https://github.com/antfu/unplugin-vue-components#configuration
       */
      // components({
      //   dirs: [resolve("src/components")],
      //   extensions: ["vue", "ts"],
      //   deep: true,
      //   dts: false,
      //   resolvers: [ElementPlusResolver()],
      // }),

      /**
       * 版权注释
       * @see https://github.com/chengpeiquan/vite-plugin-banner#advanced-usage
       */
      banner(`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n */`),
    ],
    build: {
      outDir: "dist",
      // 报错安装: npm i terser --legacy--peer-deps
      minify: "terser", // terser比esbuild（默认）慢20倍左右、可清除console、debugger
      terserOptions: {
        compress: {
          drop_console: true, // 打包去除console
          drop_debugger: true, // 打包去除debugger
        },
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
