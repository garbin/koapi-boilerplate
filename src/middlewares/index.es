import AV from 'leanengine'
import c2k from 'koa-connect'

module.exports = [
  c2k(AV.Cloud),
  async (ctx, next) => { await next(); }
];
