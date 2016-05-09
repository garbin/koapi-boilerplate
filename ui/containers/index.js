import Index from './index.jsx'
import Instance from './instance'
import Run from './run'
import Help from './help'
import Callback from './callback'
import * as Admin from './admin/index.js'
import Checkin from './checkin'
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

function initial(state, replace, cb) {
  if (state.location.query.t) {
    localStorage.t = state.location.query.t;
  }
  cb();
}

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/:release" onEnter={initial} component={Index}>
        <Route path="oauth/callback" component={Callback} />
        <Route path="help" component={Help} />
        <Route path="run" component={Run} />
        <Route path="i/:slug" component={Instance}>
          <IndexRoute component={Checkin} />
          <Route path="admin" component={Admin.Index}>
            <Route path="list" component={Admin.List} />
            <Route path="setting" component={Admin.Setting} />
            <Route path="qrcode" component={Admin.QRCode} />
            <Route path="help" component={Help} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
