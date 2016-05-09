import { INSTANCE_CREATE_SUCCESS,
         INSTANCE_EDIT_SUCCESS,
         INSTANCE_LOAD_SUCCESS,
         LOAD_FORM_ENTRY_SUCCESS,
         INSTANCE_DATA_LOAD_SUCCESS,
         INSTANCE_CHECKIN_SUCCESS,
         CHECKIN_ERROR,
         CHECKIN_RESET_ERROR,
         LOAD_FORMS_SUCCESS,
         LOAD_FORM_DATA_SUCCESS,
         LOAD_BIND_FORM_SUCCESS,
         LOAD_FORM_DATA_ERROR,
         INSTANCE_DATA_LOAD_ERROR,
         INSTANCE_CREATE_ERROR,
         INSTANCE_EDIT_ERROR,
         INSTANCE_CHECKIN_ERROR,
         LOAD_FORM_ENTRY_ERROR,
         INSTANCE_LOAD_ERROR,
         LOAD_FORMS_ERROR,
         LOAD_BIND_FORM_ERROR
       } from '../constants'
import {async_reducer} from '../lib/helper'

export const instance_created = async_reducer({
  success: INSTANCE_CREATE_SUCCESS,
  error:   INSTANCE_CREATE_ERROR,
});

export const instance_updated = async_reducer({
  success: INSTANCE_EDIT_SUCCESS,
  error:   INSTANCE_EDIT_ERROR,
});

export const forms = async_reducer({
  success: LOAD_FORMS_SUCCESS,
  error:   LOAD_FORMS_ERROR,
});

export const form_entry = async_reducer({
  success: LOAD_FORM_ENTRY_SUCCESS,
  error:   LOAD_FORM_ENTRY_ERROR,
});

export const bind_form_data = async_reducer({
  success: LOAD_FORM_DATA_SUCCESS,
  error:   LOAD_FORM_DATA_ERROR,
});

export const instance = async_reducer({
  success: [INSTANCE_LOAD_SUCCESS, INSTANCE_EDIT_SUCCESS],
  error:   INSTANCE_LOAD_ERROR,
});

export const instance_data = async_reducer({
  success: INSTANCE_DATA_LOAD_SUCCESS,
  error:   INSTANCE_DATA_LOAD_ERROR,
});

export const instance_data_created = async_reducer({
  success: INSTANCE_CHECKIN_SUCCESS,
  error:   INSTANCE_CHECKIN_ERROR,
});

export const bind_form = async_reducer({
  success: LOAD_BIND_FORM_SUCCESS,
  error:   LOAD_BIND_FORM_ERROR,
});

export function checkin_error(state = false, action) {
  switch (action.type) {
    case CHECKIN_ERROR:
      return true;
      break;
    case CHECKIN_RESET_ERROR:
      return false;
      break;
  }

  return state;
}
