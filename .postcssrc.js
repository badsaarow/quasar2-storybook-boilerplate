// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  postcssOptions: {
    plugins: [
      require('postcss-import'),
      require('autoprefixer')
    ]
  }
}
