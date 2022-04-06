const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Medium Clone'
    }
  }
});
