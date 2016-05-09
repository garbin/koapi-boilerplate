import { INSTANCE_CREATE_SUCCESS,
         INSTANCE_CREATE_ERROR,
         LOAD_FORMS_SUCCESS,
         LOAD_FORMS_ERROR,
         LOAD_FORM_DATA_SUCCESS,
         LOAD_FORM_DATA_ERROR,
         LOAD_FORM_ENTRY_SUCCESS,
         LOAD_FORM_ENTRY_ERROR,
         LOAD_BIND_FORM_SUCCESS,
         LOAD_BIND_FORM_ERROR,
         CHECKIN_ERROR,
         CHECKIN_RESET_ERROR,
         INSTANCE_LOAD_SUCCESS,
         INSTANCE_LOAD_ERROR,
         INSTANCE_CHECKIN_SUCCESS,
         INSTANCE_CHECKIN_ERROR,
         INSTANCE_DATA_LOAD_SUCCESS,
         INSTANCE_DATA_LOAD_ERROR,
         CHECKIN_CLEAR_ENTRY,
         INSTANCE_EDIT_SUCCESS,
         INSTANCE_EDIT_ERROR
       } from '../constants'
import {api, jinshuju} from '../lib/fetch'
import {async_success, async_error} from '../lib/helper'

export function load_forms() {
  return dispatch => {
    return jinshuju.read('/forms').then(
      forms => dispatch(async_success(LOAD_FORMS_SUCCESS, forms)),
      error => dispatch(async_error(LOAD_FORMS_ERROR, error))
    );
  }
}

export function load_form_data(token) {
  return dispatch => {
    return jinshuju.browse(['forms', token, 'entries']).then(
      entries => dispatch(async_success(LOAD_FORM_DATA_SUCCESS, entries)),
      error => dispatch(async_error(LOAD_FORM_DATA_ERROR, error))
    );
  }
}

export function load_bind_form(token) {
  return dispatch => {
    return jinshuju.read(['/forms', token]).then(
      form => dispatch(async_success(LOAD_BIND_FORM_SUCCESS, form)),
      error => dispatch(async_error(LOAD_BIND_FORM_ERROR, error))
    );
  }
}

export function load_instance(slug) {
  return dispatch => {
    return api.read(['instances', slug]).then(
      instance => dispatch(async_success(INSTANCE_LOAD_SUCCESS, instance)),
      err  => dispatch(async_error(INSTANCE_LOAD_ERROR, err))
    );
  }
}

export function load_instance_data(id) {
  return dispatch => {
    return api.browse(['instances', id, 'data']).then(
      data => {dispatch(async_success(INSTANCE_DATA_LOAD_SUCCESS, data))},
      err  => dispatch(async_error(INSTANCE_DATA_LOAD_ERROR, err))
    );
  }
}

export function create(app_id, release_id, config) {
  return dispatch => {
    return api.add('/instances', {body:{app_id, release_id, config}}).then(
      instance => {
        dispatch(async_success(INSTANCE_CREATE_SUCCESS, instance));
        return instance;
      },
      error    => (dispatch(async_error(INSTANCE_CREATE_ERROR, error))),
    );
  }
}

export function update(instance_id, config) {
  return dispatch => {
    return api.replace(['instances', instance_id], {body:{config}}).then(
      instance => (dispatch(async_success(INSTANCE_EDIT_SUCCESS, instance))),
      error    => (dispatch(async_error(INSTANCE_EDIT_ERROR, error))),
    );
  }
}
export function load_entry(instance, phone) {
  return dispatch => {
    let query = {
      app_id: instance.app_id,
      user_id: instance.user_id,
    };
    query[instance.config.phone_field] = phone;
    return api.read('/forms/' + instance.config.form_id + '/entries', { query })
              .then(
                entry => {
                  dispatch(async_success(LOAD_FORM_ENTRY_SUCCESS, entry));
                  return entry;
                },
                error => {
                  dispatch(async_error(LOAD_FORM_ENTRY_ERROR, error));
                  dispatch(async_error(CHECKIN_ERROR, error));
                  return error;
                }
    );
  }
}

export function reset_error() {
  return {
    type: CHECKIN_RESET_ERROR
  }
}

export function checkin_error() {
  return {
    type: CHECKIN_ERROR
  }
}

export function checkin(instance, data) {
  return dispatch => {
    return api.add(['instances', instance.id, 'data'], {body:{instance_id:instance.id, data}}).then(
      instance => {
        dispatch(async_success(INSTANCE_CHECKIN_SUCCESS, instance));

        return instance;
      },
      error    => {
        dispatch(async_error(INSTANCE_CHECKIN_ERROR, error));
        dispatch(async_error(CHECKIN_ERROR, error));

        return error;
      },
    );
  }
}
