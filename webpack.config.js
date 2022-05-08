const path = require('path')

module.exports = {
    mode:"development",
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'js/dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  watch: true,
}