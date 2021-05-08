module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  resolve: {
    alias: {
      "quasar-variables": "quasar/src/styles/quasar.variables.scss",
      "quasar-variables-styl": "quasar/src/css/variables.sass",
      "quasar-styl": "quasar/dist/quasar.sass",
      "quasar-addon-styl": "quasar/src/css/flex-addon.sass"
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.vue$/,
        loader: require.resolve('vue-loader'),
        options: {},
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
      }
    ]
  }
}
