import React from 'react'
import ReactDOM from 'react-dom'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import Joi from 'joi'
import _ from 'lodash'
import {connect} from '../lib/helper'
import * as instance_actions from '../actions/instance'
import {reduxForm} from 'redux-form'
import Form from './form'
import Select from 'react-select'
import ReactSwipe from 'react-swipe'
import 'react-select/dist/react-select.css'

export class InputLimit extends React.Component {
  render(){
    let {max, value} = this.props;
    let left = max - (value ? value.length : 0);
    return (<span className="tip">
            {this.props.max}字以内，还可以输入{left}个字
          </span>);
  }
}

export class Setting extends Form {
  validatorTypes = {
    form_id: Joi.required().label('关联表单'),
    phone_field: Joi.required().label('手机字段'),
    name_field: Joi.required().label('姓名字段'),
    subject: Joi.string().max(20).required().label('签到标题'),
    welcome_message: Joi.string().max(100).required().label('欢迎文案'),
    success_message: Joi.string().max(100).required().label('签到成功文案'),
    error_message: Joi.string().max(100).required().label('签到失败文案')
  }
  componentWillMount(){
    this.props.actions.load_forms();
    if (this.props.config.form_id) {
      this.props.actions.load_bind_form(this.props.config.form_id);
    }
  }
  slidePreviewTo(pos, e){
    if (_.isNumber(pos)) {
      this.refs.preview.slide(pos);
    } else {
      this.refs.preview[pos]();
      pos = this.refs.preview.getPos();
    }
    let dots = ReactDOM.findDOMNode(this.refs.preview_point);
    $(dots).find('span').removeClass('active');
    $($(dots).find('span').get(pos)).addClass('active');
  }
  submit(data){
    this.props.validate(err => {
      if (err) {
        console.error(err, this.props.errors);
      } else {
        this.props.save(data);
      }
    });
  }
  render() {
    const {bind_form, forms, fields: { form_id,
                                       phone_field,
                                       name_field,
                                       subject,
                                       welcome_message,
                                       success_message,
                                       error_message
                                      }, handleSubmit, actions} = this.props;
    var {onChange, ...forms_other_props} = form_id;
    let formsOnChange = _.wrap(onChange, function (func, v) {
      actions.load_bind_form(v.value);
      func(v);
    });

    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <div>
          <div className="jinshuju-form">
            <div className="form-header jtext-title">
              关联表单
            </div>
            <div className="form-content">
              <div className="row">
                <div className="col-sm-8">
                  <div className="jtext-title">
                    关联表单
                    &nbsp;
                    {this.props.isValid('form_id') ? null : (
                      <span style={{color:'red'}}>
                        Invalid {this.props.getValidationMessages('form_id')}
                      </span>)}
                  </div>
                  <div className='form-group'>
                    <label>请先选择用来做签到所关联的表单，该表单必须有手机号字段和姓名字段。</label>
                    <Select {...forms_other_props}
                      onChange={formsOnChange.bind(this)}
                      className="select-sm"
                      searchable={false}
                      options={_.map(forms.data, form => ({value:form.token, label:form.name}))}
                      placeholder="请选择表单" />
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <div className="jtext-title">
                        手机号字段
                        &nbsp;
                        {this.props.isValid('phone_field') ? null : (
                          <span style={{color:'red'}}>
                            Invalid {this.props.getValidationMessages('phone_field')}
                          </span>)}
                      </div>
                      <div className='form-group'>
                        <label>该手机号字段用于身份验证</label>
                        <Select {...phone_field}
                          className="select-sm"
                          searchable={false}
                          options={ _.map(_.get(bind_form.data, 'fields'),
                                   field => ({value:field.api_code, label:field.label}))}
                          placeholder="请选择字段" />
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <div className="jtext-title">
                        姓名字段
                        &nbsp;
                        {this.props.isValid('name_field') ? null : (
                          <span style={{color:'red'}}>
                            Invalid {this.props.getValidationMessages('name_field')}
                          </span>)}
                      </div>
                      <div className='form-group'>
                        <label>该姓名字段用于签到成功后的姓名展示</label>
                        <Select {...name_field}
                          className="select-sm"
                          searchable={false}
                          options={ _.map(_.get(bind_form.data, 'fields'),
                                   field => ({value:field.api_code, label:field.label}))}
                          placeholder="请选择字段" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4"></div>
              </div>
            </div>
          </div>
          <div className="jinshuju-form">
            <div className="form-header jtext-title">
              配图与文案
            </div>
            <div className="form-content">
              <div className="row">
                <div className="col-sm-8">
                  <div className="jtext-title">
                    签到标题
                    <InputLimit max={20} value={subject.value} />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="此设置将在用户签到前展示"
                      className="form-control"
                      maxLength={20}
                      {...subject} />

                  </div>
                  <div className="jtext-title">
                    欢迎文案
                    <InputLimit max={100} value={welcome_message.value} />
                  </div>
                  <div className="form-group">
                    <textarea maxLength={100}
                      placeholder="此设置将在用户签到前展示"
                      className="form-control"
                      {...welcome_message} />
                  </div>
                  <div className="jtext-title">
                    签到成功文案
                    <InputLimit max={100} value={success_message.value} />
                  </div>
                  <div className="form-group">
                    <textarea maxLength={100}
                      placeholder="此设置将在用户签到成功后展示"
                      className="form-control"
                      {...success_message} />
                  </div>
                  <div className="jtext-title">
                    签到失败文案
                    <InputLimit max={100} value={error_message.value} />
                  </div>
                  <div className="form-group">
                    <textarea maxLength={100}
                      placeholder="此设置将在用户签到失败后展示"
                      className="form-control"
                      {...error_message} />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="previews">
                    <div className="preview-content">
                      <div className="wrapper" onClick={this.slidePreviewTo.bind(this, 'next')}>
                        <ReactSwipe ref="preview">
                          <div className="item welcome"></div>
                          <div className="item success"></div>
                          <div className="item failed"></div>
                        </ReactSwipe>
                      </div>
                    </div>
                    <div className="preview-point text-center" ref="preview_point">
                      <span onClick={this.slidePreviewTo.bind(this, 0)} className="active"></span>
                      <span onClick={this.slidePreviewTo.bind(this, 1)}></span>
                      <span onClick={this.slidePreviewTo.bind(this, 2)}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="c-button-fillblue">
            保存配置
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'setting',                           // a unique name for this form
  fields: ['form_id', 'phone_field', 'name_field', 'subject',
           'welcome_message', 'success_message', 'error_message'] // all the fields in your form
}, state => ({
  initialValues: _.get(state, 'instance.data.config', {
    subject: '活动签到',
    welcome_message: '欢迎您来参加这次活动，希望您能度过愉快的一天，同时也有所收获。请输入您的手机号以便我们核实身份。',
    success_message: '欢迎您的到来。请您稍等休息，活动即将开始。',
    error_message: '抱歉！手机号验证错误，请重新输入进行验证。如需帮助，请联系现场服务人员。'
  })
}))(connect(state => ({
  forms:state.forms,
  bind_form:state.bind_form}),
  instance_actions)(validation(strategy)(Setting)));
