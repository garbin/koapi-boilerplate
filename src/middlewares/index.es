import historyApiFallback from 'koa-history-api-fallback'
import convert from 'koa-convert'

module.exports = {
  before:[],
  after: [
    convert(historyApiFallback({ verbose:true }))
  ]
};
