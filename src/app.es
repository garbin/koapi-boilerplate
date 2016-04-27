import Koapi, {Model} from 'koapi'
import config from '../config'
import require_all from 'require-all'
import _ from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import {storage} from './lib/helper';

import historyApiFallback from 'koa-history-api-fallback'
import convert from 'koa-convert'

const app  = new Koapi();

app.koa.use(convert(historyApiFallback({ verbose:true })));

var server = app.run(Object.assign({
  middlewares: require('./middlewares'),

  routers: _.values(require_all({
    dirname: __dirname + '/routers',
    filter :  /(.+)\.(js|es)$/
  })).map(router=>router.default),

  error:[{ path: storage('/logs/error.log') }],

  accesslog: {
    options:{
      name: 'access',
      streams: [ {path:storage('/logs/access.log')} ]
    }
  },

  serve: {
    root: storage('/public'),
  }
}, config));

export default app;
export {server};
