import React from 'react'
import Instance from './instance'
import Header from '../components/layout/header'
import Content from '../components/layout/content'
import Navs from '../components/layout/navs'
import Loader from 'react-loader'
import {connect} from '../lib/helper'
import * as instance_actions from '../actions/instance'

export class Help extends React.Component {
  render(){
    return (
      <div className="app-data-zone">
        <div className="app-data-header">
          <div className="row">
            <div className="col-sm-6"><i className="glyphicon glyphicon-question-sign"></i>&nbsp;帮助
            </div>
            <div className="col-sm-6 text-right"></div>
          </div>
        </div>
        <div className="app-data-list">
          <div className="help-zone row">
            <div className="col-md-9">
              <div className="help-item">
                <div className="title">配置签到应用</div>
                <div className="des">首先活动组织者需在金数据创建一个带有手机号字段和姓名字段的表单。同时要求该表单已收集完到场的嘉宾信息。点击右上角「导航-应用配置」</div>
                <div className="imgZone">
                  <div className="bg1 bg"></div>
                </div>
              </div>
              <div className="help-item">
                <div className="title">配置签到相关文案。</div>
                <div className="des">你可以在签到成功文案中，加入到场嘉宾的姓名，这里的嘉宾姓名与之前「关联表单」步骤中的「姓名字段」是一致的。如发现不能插入姓名字段，请到前面的步骤中重新配置「姓名字段」</div>
                <div className="imgZone">
                  <div className="bg2 bg"></div>
                </div>
              </div>
              <div className="help-item">
                <div className="title">二维码发布</div>
                <div className="des">配置成功后，活动组织者可在「二维码发布」页面根据不同需求，下载不同尺寸的二维码。打印后可放置在现场门口，用于嘉宾扫码签到。</div>
                <div className="imgZone">
                  <div className="bg3 bg"></div>
                </div>
              </div>
              <div className="help-item">
                <div className="title">签到结果</div>
                <div className="des">在这里，可以实时查看嘉宾签到情况。</div>
                <div className="imgZone">
                  <div className="bg4 bg"></div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="form-group help-footer">
                <div className="start-use">好的，现在你可以开始使用了！</div>
                <a href="./setting" className="c-button-fillblue">开始使用</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   instance:state.instance }),
                                   instance_actions )(Help);
