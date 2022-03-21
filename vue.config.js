const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/medium-clone/dist'
    : '/',
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Medium Clone'
    }
  }
});
