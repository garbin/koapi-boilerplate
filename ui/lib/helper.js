import { ASYNC_ERROR } from '../constants'
import {bindActionCreators} from 'redux';
import {connect as redux_connect} from 'react-redux';
import config from '../config'
import _ from 'lodash';
import {batchActions} from 'redux-batched-actions';

export function connect(mapState, actions) {
  var mapActions = (dispatch)=>{
    if (actions) {
      return {actions:bindActionCreators(actions, dispatch)}
    } else {
      return {actions};
    }
  };
  return redux_connect(mapState, mapActions);
}

export function async_success(type, payload) {
  return {
    type: type,
    payload: payload,
  };
}

export function async_error(type, error) {
  return batchActions([
    { type: type, payload: error },
    { type: ASYNC_ERROR, payload: error },
  ]);
}

export function async_reducer(types) {
  return function (state = {data:null, loaded:false, error:null}, action) {
    let success_types = _.isArray(types.success) ? types.success : [types.success];
    let error_types = _.isArray(types.error) ? types.error : [types.error];
    if (_.includes(success_types, action.type)) {
      return {
        data: action.payload,
        loaded:true,
        error:null
      }
    }

    if (_.includes(error_types, action.type)) {
        return {
          error: action.payload,
          loaded:true,
          data:null
        }
    }

    return state;
  }
}

export function getInstanceUrl(instance) {
  return config.url + '/' + config.version + '/i/' + instance.slug;
}

export function getFormUrl(token) {
  return config.jinshuju.website + '/f/' + token;
}
