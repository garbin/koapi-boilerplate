import React from 'react';
import {connect} from '../../lib/helper'
import Loader from 'react-loader'
import * as instance_actions from '../../actions/instance'
import moment from 'moment'

export class List extends React.Component {
  componentWillMount(){
    let {instance, actions:{load_instance_data, load_form_data}, params} = this.props;
    load_form_data(instance.data.config.form_id);
    load_instance_data(instance.data.id);
    this.interval = setInterval(function(){
      load_instance_data(instance.data.id);
    }, 3000, true);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render() {
    let list = [];
    let { bind_form_data, instance, instance_data } = this.props;

    if (bind_form_data.loaded && instance.loaded) {
      bind_form_data.data.forEach((item, idx)=>{
        let _name  = item[instance.data.config.name_field];
        let _phone = item[instance.data.config.phone_field];
        list.push({
          name:        _.get(_name, 'value', _name),
          phone:       _.get(_phone, 'value', _phone),
          signup:      false,
          signup_time: null,
        });
      });
    }

    if (instance_data.loaded) {
      instance_data.data.forEach((item, idx)=>{
        let tmp_idx = _.findIndex(list, {phone:item.data.phone});
        if (tmp_idx != -1) {
          list[tmp_idx].signup = true;
          list[tmp_idx].signup_time = moment(item.created_at).format();
        }
      });
    }

    let itemslist = _.groupBy(list, function(v, k) {
      return v.signup ? 'signed' : 'unsigned';
    });

    let signedItems = _.orderBy((itemslist.signed||[]), ['signup_time'], ['desc']).map((item, idx) => (
        <tr key={idx}>
          <td>{item.name || '-'}</td>
          <td>{item.phone || '-'}</td>
          <td>{moment(item.signup_time).format('YYYY-MM-DD HH:mm:ss')}</td>
        </tr>
      ));

    let unsignedItems = (itemslist.unsigned||[]).map((item, idx) => (
        <tr key={idx}>
          <td>{item.name || '-'}</td>
          <td>{item.phone || '-'}</td>
        </tr>
      ));

    let signedNum   = signedItems.length;
    let unsignedNum = unsignedItems.length;
    let rowNum      = Math.max(signedItems.length, unsignedItems.length, 10);
    for(let i       = signedItems.length;i<rowNum;i++) {
      signedItems.push((
        <tr key={i}>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      ));
    }
    for(let i=unsignedItems.length;i<rowNum;i++) {
      unsignedItems.push((
        <tr key={i}>
          <td></td>
          <td></td>
        </tr>
      ));
    }


    return (
      <Loader loaded={bind_form_data.loaded}>
        <div className="app-data-zone">
          <div className="app-data-header">
            <div className="row">
              <div className="col-sm-6"><i className="glyphicon glyphicon-list-alt"></i>&nbsp;签到结果
              </div>
              <div className="col-sm-6 text-right text-medium">
                现场已签到：{signedNum}人（共{list.length || 0}人）
              </div>
            </div>
          </div>
          <div className="app-data-list">
            <div className="row">
              <div className="col-sm-6">
                <div className="table-summary"><span className="c-red">未签到列表（{unsignedNum}人）</span></div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>手机</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unsignedItems}
                  </tbody>
                </table>
              </div>
              <div className="col-sm-6">
                <div className="table-summary"><span className="c-green">已签到列表（{signedNum}人）</span></div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>姓名</th>
                      <th>手机</th>
                      <th>签到时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signedItems}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Loader>
      );
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   instance:state.instance,
                                   instance_data: state.instance_data,
                                   bind_form_data: state.bind_form_data }),
                                   instance_actions)(List);
