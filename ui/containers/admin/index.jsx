import React from 'react';
import {connect} from '../../lib/helper'
import Loader from 'react-loader'
import Setting from '../../components/setting'
import Header from '../../components/layout/header'
import Content from '../../components/layout/content'
import Navs from '../../components/layout/navs'
import moment from 'moment'
import config from '../../config'
import * as instance_actions from '../../actions/instance'
import * as initial_actions from '../../actions/initial'

export class Index extends React.Component {
  componentWillMount(){
    return this.props.actions.load_account_apps();
  }
  componentWillReceiveProps(props, state){
    if (props.current_app) {
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
  render(){
    let {children, ...other} = this.props;

    return (
      <div>
        <Header {...this.props}>
          <Navs {...this.props} />
        </Header>
        <Content>
          {children ? React.cloneElement(children, ...other) : null}
        </Content>
      </div>
    );
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   account_apps:state.account_apps,
                                   current_app: state.current_app,
                                   async_error: state.async_error,
                                   instance:state.instance }),
                                   Object.assign({}, initial_actions, instance_actions))(Index);
