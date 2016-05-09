import React from 'react'
import Setting from '../components/setting'
import Header from '../components/layout/header'
import Content from '../components/layout/content'
import Alert from 'react-s-alert'
import {connect} from '../lib/helper'
import * as initial_actions from '../actions/initial'
import * as instance_actions from '../actions/instance'
import config from '../config'
import qs from 'qs'

export class Run extends React.Component {
  static get contextTypes(){
    return {
      router: React.PropTypes.object,
    };
  }
  componentWillMount(){
    this.props.actions.load_account_apps();
  }
  componentWillReceiveProps(props, state){
    if (!_.isEmpty(props.current_app)) {
      localStorage.access_token = props.current_app._pivot_access_token;
    }
    if (props.async_error == 401) {
      window.location.href = config.oauth.server + '/oauth/authorize?' + qs.stringify({
        client_id: props.current_app.client_id,
        redirect_uri: props.current_app.redirect_uri,
        response_type: 'code',
        scope:'public forms read_entries form_setting',
        state:JSON.stringify({
          redirect: window.location.href
        }),
      });
    }
  }
  save(data) {
    this.props.actions.create(config.app_id,
      _.get(this.props.release.data, 'id'),
      data
    ).then(instance => {
      Alert.success('配置成功!', {
        position: 'bottom'
      });
      this.context.router.replace('/v1/i/' + instance.slug + '/admin/qrcode')
    });
  }
  render(){
    let {instance, release} = this.props;
    return (
      <div>
        <Header {...this.props}>
          haha
        </Header>
        <Content>
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
              <Setting config={{}} save={this.save.bind(this)} />
            </div>
            </div>
        </Content>
      </div>);
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   account_apps:state.account_apps,
                                   current_app: state.current_app,
                                   async_error: state.async_error,
                                   instance: state.instance_created }),
                                   Object.assign({},
                                                 instance_actions,
                                                 initial_actions))(Run);
