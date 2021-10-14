/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configure } = require('quasar/wrappers')
const path = require('path')

module.exports = configure(function (/*ctx*/) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}',
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: ['global-components'],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'line-awesome',
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    settings: {
      jest: { version: 'latest' },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueLoaderOptions: 'prop',

      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          assets: path.resolve(__dirname, './src/assets'),
        }
      },
      // https://v2.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/*chain*/) {
        // chain.plugin('eslint-webpack-plugin')
        // .use(ESLintPlugin, [{ extensions: [ 'js', 'ts', 'vue' ] }])
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'ko-KR', // Quasar language pack
      config: {},
      plugins: ['Notify', 'Loading', 'Dialog'],
      config: {
        notify: {
          type: 'warning',
        },
      },
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: ['slideInRight', 'slideOutRight', 'fadeIn', 'fadeOut'],

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW(/* chain */) {
        //
      },
      manifest: {
        name: 'Quasar2 Storybook Boilerplate',
        short_name: 'Quasar2 Storybook Boilerplate',
        description: 'Quasar2 Storybook Boilerplate',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // add the dynamic top padding on iOS mobile devices
      iosStatusBarPadding: true,

      // Quasar handles app exit on mobile phone back button.
      // Requires Quasar v1.9.3+ for true/false, v1.12.6+ for '*' wildcard and array values
      // true/false/'*'/['/login', '/home', '/my-page'],
      backButtonExit: false,

      // On the other hand, the following completely
      // disables Quasar's back button management.
      // Requires Quasar v1.14.1+
      backButton: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'quasar2-boilerplate',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(/* chain */) {
        // do something with the Electron main process Webpack cfg
      },

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  }
})
