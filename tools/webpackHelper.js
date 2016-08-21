const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * [generateEntries 查找src下所有的 entry.js, 生成 entry Map]
 * @return {[Object]}  形如 :
 * {
 * 'pages/data/ListView/entry.js': ['./src/pages/data/ListView/entry.js', 'webpack/hot/only-dev-server'],
 * 	....
 * 	'devServerClient': 'webpack-dev-server/client?http://127.0.0.1:8086'
 * }
 */
function generateEntries (entryFiles, isProd) {
  return _.reduce(entryFiles, function(entryObj, entryFile) {
    var chunkName = entryFile.replace(/\/entry\.js$/, '');
    entryObj[chunkName] = [entryFile];
    if (!isProd) {
      entryObj[chunkName].push('webpack/hot/only-dev-server')
    }
    return entryObj;
  }, {});
};

/**
 * [genarateHtmlPlugins 根据入口文件 build htmlplugin数组]
 * @param  {[String]} entryFiles [filePath]
 * @return {[Array]}
 * chunksName 形如： 'pages/data/ListView/entry'
 * htmlPath 形如 'pages/data/ListView/index.html',
 */
function genarateHtmlPlugins(entryFiles, isProd) {
  return _.map(entryFiles, function (entryFile) {
    var chunkName = entryFile.replace(/\/entry\.js$/, '');
    var htmlPath = entryFile.replace(/entry\.js$/, 'index.html');
    var chunks = [chunkName, 'vendor'];
    if (!isProd) {
      chunks.push('devServerClient');
    }
    return new HtmlWebpackPlugin({
      chunks: chunks,
      filename: htmlPath,
      template: './pages/tpl.html'
    });
  });
}

module.exports = {
  generateEntries: generateEntries,
  genarateHtmlPlugins: genarateHtmlPlugins,
};
