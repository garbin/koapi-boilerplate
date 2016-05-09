import React from 'react'
import Setting from '../../components/setting'
import Loader from 'react-loader'
import Alert from 'react-s-alert'
import {connect, async_success} from '../../lib/helper'
import * as instance_actions from '../../actions/instance'
import config from '../../config'

export class SettingContainer extends React.Component {
  save(config){
    let {dispatch} = this.props;
    this.props.actions.update(this.props.instance.data.id, config).then(
      action => {
        Alert.success("配置更新成功!", { position:"bottom" });
      }
    )
  }
  render(){
    let {instance_updated, instance, release} = this.props;
    return (
      <Loader loaded={instance.loaded}>
        <div className="app-data-zone">
          <div className="app-data-header">
            <div className="row">
              <div className="col-sm-6">
                <i className="glyphicon glyphicon-cog"></i>&nbsp;应用配置
                </div>
                <div className="col-sm-6 text-right"></div>
              </div>
            </div>
            <div className="app-data-list">
              <Setting config={_.get(instance.data, 'config')} save={this.save.bind(this)} />
            </div>
          </div>
        </Loader>
        );
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   instance:state.instance,
                                   instance_updated:state.instance_updated}),
                                   instance_actions )(SettingContainer);
