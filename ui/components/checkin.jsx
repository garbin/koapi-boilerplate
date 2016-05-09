import React from 'react'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import Joi from 'joi'
import _ from 'lodash'
import {connect} from '../lib/helper'
import * as instance_actions from '../actions/instance'
import {reduxForm} from 'redux-form'
import Form from './form'

export class Checkin extends Form {
  validatorTypes = {
    phone: Joi.required().label('手机号码'),
  }
  submit(data){
    this.props.validate(err => {
      if (err) {
        console.error(err, this.props.errors);
      } else {
        this.props.submit(data);
      }
    });
  }
  render() {
    let {fields:{phone}, config, handleSubmit} = this.props;
    return (
      <div className="sub-page">
                <div className="container">
                  <div className="text-zone">
                    <div className="text-title">{config.subject}</div>
                    <div className="text-welcome">
                      {config.welcome_message}
                    </div>
                  </div>
                  <form className="form-zone checkin-form" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <div className="form-group">
                      <label htmlFor="phoneNumber">登记时手机号</label>
                      <div className="form-group">
                        <input type="tel" className="form-control" {...phone} />
                      </div>
                    </div>
                    <div className="button-zone">
                      <button className="btn-block btn btn-default" type="submit">签到</button>
                    </div>
                  </form>
                </div>
              </div>
    );
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'checkin',                           // a unique name for this form
  fields: ['phone'] // all the fields in your form
})(validation(strategy)(Checkin));
