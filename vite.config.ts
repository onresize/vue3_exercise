import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import banner from "vite-plugin-banner";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import pkg from "./package.json";
//安装jsx插件 npm install @vitejs/plugin-vue-jsx -D
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueI18n from "@intlify/vite-plugin-vue-i18n";

const resolve = (dir: string): string => path.resolve(__dirname, dir);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("当前环境：", env);
  return {
    base: "/",
    server: {
      port: 3010,
      // proxy: {
      //   '/devapi': {
      //     target: 'http://192.168.10.198',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/devapi/, ''),
      //   },
      // },
    },
    resolve: {
      alias: {
        // 兼容webpack的习惯
        "@": resolve("src"),
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
        refTransform: true, // 开启ref转换、使用$ref响应式定义、不需要.value
      }),
      vueJsx(),
      // https://github.com/intlify/vite-plugin-vue-i18n
      VueI18n({
        include: [resolve(__dirname, "@/src/locales/**")],
      }),
      VueSetupExtend(), // * name 可以写在 script 标签上
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
      components({
        dirs: [resolve("src/components")],
        extensions: ["vue", "ts"],
        deep: true,
        dts: false,
        resolvers: [ElementPlusResolver()],
      }),

      /**
       * 版权注释
       * @see https://github.com/chengpeiquan/vite-plugin-banner#advanced-usage
       */
      banner(
        `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n */`
      ),
    ],
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: env.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: "myDist",
      // minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // 报错安装: npm i terser --legacy--peer-deps
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE,
          drop_debugger: env.VITE_DROP_CONSOLE,
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

