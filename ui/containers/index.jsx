import React from 'react'
import Loader from 'react-loader'
import Page from '../components/layout/page'
import Alert from 'react-s-alert'
import config from '../config'
import {connect, oauth_redirect} from '../lib/helper'
import * as initial_actions from '../actions/initial'
import _ from 'lodash'
import './style/style.less'
import qs from 'qs'


export class Index extends React.Component {

  componentWillMount(){
    this.props.actions.load_release(config.app_id, this.props.params.release);
  }

  renderError(){
    return <div>您尚未购买</div>
  }

  render(){
    let { release,
          children,
          params,
          location } = this.props;

    return (
      <Loader loaded={release.loaded}>
        {release.error ? release.error.toString() : (
          <Page>
            {children ? React.cloneElement(children, {release, params, location}) : null}
            <Alert position="bottom" />
          </Page>
        )}
      </Loader>
    );
  }
};

export default connect(state => ({ release:state.release }),
                                   initial_actions )(Index);
