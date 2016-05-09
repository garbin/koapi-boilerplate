import React from 'react'
import Instance from './instance'
import Loader from 'react-loader'
import {connect} from '../lib/helper'
import * as instance_actions from '../actions/instance'
import _ from 'lodash'
import CheckinForm from '../components/checkin'
import {Modal} from 'react-bootstrap'


export class Checkin extends React.Component {
  checkin(data){
    if (this.props.instance.loaded) {
      this.props.actions.load_entry(this.props.instance.data, data.phone).then(
        res => {
          if (_.isArray(res) && res.length > 0) {
            console.log(res);
            this.props.actions.checkin(this.props.instance.data, data);
          } else {
            this.props.actions.checkin_error();
          }
        }
      )
    }
  }

  renderSuccess(){
    let {instance_data_created, form_entry, instance:{data, loaded}} = this.props;
    let success_message = _.template(_.get(data, 'config.success_message'));

    return (<div className="sub-page success-page">
                <div className="container">
                  <div className="icon-zone">
                    <div className="checkin-success"></div>
                  </div>
                  <div className="text-zone">
                    <div className="text-title">签到成功！</div>
                    <div className="text-welcome">{success_message({
                        name: form_entry.data[0][data.config.name_field]
                    })}</div>
                  </div>
                </div>
              </div>);
  }
  hide(){
    this.props.actions.reset_error();
  }
  render(){
    let {checkin_error, form_entry, instance, instance_data_created} = this.props;
    let error_message = _.template(_.get(instance, 'data.config.error_message'));
    var content;
    if(instance_data_created.loaded && form_entry.loaded) {
      content = this.renderSuccess();
    }else {
      content = (
        <CheckinForm config={_.get(instance, 'data.config', {})} submit={this.checkin.bind(this)} />
      );
    }
    return (
      <div className="checkin-page">
        <Loader loaded={instance.loaded}>
          {content}
        </Loader>
        <Modal className="error-page" backdrop="static" show={checkin_error} onHide={this.hide.bind(this)}>
          <Modal.Body>
            <div className="icon-zone">
              <div className="checkin-failed"></div>
            </div>
            <div className="text-zone">
              <div className="text-title">签到失败</div>
              <div className="text-error">{error_message()}</div>
            </div>
            <div className="button-zone">
              <button className="btn btn-default btn-block" type="button" onClick={this.hide.bind(this)}>重新签到</button>
            </div>
          </Modal.Body>
        </Modal>
        <div className="bgcard"></div>
      </div>
    );
  }
};

export default connect(state => ({ checkin_error: state.checkin_error,
                                   form_entry: state.form_entry,
                                   instance:state.instance,
                                   instance_data_created: state.instance_data_created }),
                                   instance_actions )(Checkin);
