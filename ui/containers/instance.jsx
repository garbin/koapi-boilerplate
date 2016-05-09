import React from 'react'
import Loader from 'react-loader'
import {connect} from '../lib/helper'
import * as instance_actions from '../actions/instance'
import config from '../config'

export default class Instance extends React.Component {
  static get contextTypes(){
    return {
      router: React.PropTypes.object,
    };
  }
  componentWillMount(){
    return this.props.actions.load_instance(this.props.params.slug).then(
      action => {
        this.props.actions.load_bind_form(action.payload.config.form_id)
        return action;
      }
    );
  }
  render(){
    let {instance, release, children, params, location} = this.props;
    return (
          <Loader loaded={instance.loaded}>
            {children ? React.cloneElement(children, {instance, release, params, location}) : null}
          </Loader>
    );
  }
};

export default connect(state => ({ bind_form: state.bind_form,
                                   instance: state.instance }),
                                   instance_actions )(Instance);
