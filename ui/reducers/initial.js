import { INITIAL_LOAD_APPS_SUCCESS,
         LOAD_RELEASE_SUCCESS,
         INITIAL_LOAD_APPS_ERROR,
         LOAD_RELEASE_ERROR,
         ASYNC_ERROR
        } from '../constants'
import {async_reducer} from '../lib/helper'
import config from '../config'
import _ from 'lodash'

export const account_apps = async_reducer({
  success: INITIAL_LOAD_APPS_SUCCESS,
  error: INITIAL_LOAD_APPS_ERROR
});

export function current_app(state = {}, action) {
  switch (action.type) {
    case INITIAL_LOAD_APPS_SUCCESS:
      return _.find(action.payload, {id:config.app_id});
      break;
  }
  return state;
}

export const release = async_reducer({
  success: LOAD_RELEASE_SUCCESS,
  error: LOAD_RELEASE_ERROR
});

export function async_error(state = null, action) {
  switch (action.type) {
    case ASYNC_ERROR:
      return action.payload.status;
      break;
  }
  return state;
}
