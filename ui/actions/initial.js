import { INITIAL_LOAD_APPS_SUCCESS,
         INITIAL_LOAD_APPS_ERROR,
         UPDATE_TOKEN_SUCCESS,
         UPDATE_TOKEN_ERROR,
         LOAD_RELEASE_SUCCESS,
         LOAD_RELEASE_ERROR
       } from '../constants'
import {async_success, async_error} from '../lib/helper'
import {api} from '../lib/fetch'

export function load_account_apps(token) {
  return dispatch => {
    return api.read('/account/apps').then(
      apps => dispatch(async_success(INITIAL_LOAD_APPS_SUCCESS, apps)),
      err  => dispatch(async_error(INITIAL_LOAD_APPS_ERROR, err))
    );
  }
}

export function load_release(app_id, release) {
  return dispatch => {
    return api.read(['apps', app_id, 'releases', release]).then(
      release => dispatch(async_success(LOAD_RELEASE_SUCCESS, release)),
      error => dispatch(async_error(LOAD_RELEASE_ERROR, error))
    );
  }
}

export function update_access_token(app_id, code) {
  return dispatch => {
    return api.replace('/account/apps/' + app_id, {
      body:{code}
    }).then(
      token => dispatch(async_success(UPDATE_TOKEN_SUCCESS, token)),
      error => dispatch(async_error(UPDATE_TOKEN_ERROR, error)),
    );
  }
}
