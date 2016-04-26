import Koapi, {Model} from 'koapi'
import config from '../config'
import require_all from 'require-all'
import _ from 'lodash';
import path from 'path';
import fs from 'fs-extra';
import {storage} from './lib/helper';

const app  = new Koapi();

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
