import React from 'react'
import Loader from 'react-loader'
import {connect} from '../lib/helper'
import * as initial_actions from '../actions/initial'
import config from '../config'

export class Callback extends React.Component {
  componentWillMount(){
    let {actions, location:{query}} = this.props;
    this.props.actions.update_access_token(config.app_id, query.code).then(
      action => {
        console.log(action.payload);
        localStorage.access_token = action.payload.access_token;
        try {
          var state = JSON.parse(query.state);
          if (state.redirect) {
            window.location.href = state.redirect;
          }
        } catch (e) { }
      }
    );
  }
  render(){
    return (<div>获取授权中...</div>);
  }
};

export default connect(state => ({ release: state.release }),
                                   initial_actions)(Callback);
