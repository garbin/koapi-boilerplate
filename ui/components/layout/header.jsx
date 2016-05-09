import React from 'react'
import {getFormUrl} from '../../lib/helper'

export default class Page extends React.Component {
  render(){
    let {current_app, bind_form} = this.props;
    return (
      <div className="page-jheader">
        <div className="container">
          <div className="header-content">
            <div className="row">
              <div className="col-sm-6">
                <div className="app-logo-zone item">
                  <img src={current_app.logo} className="app-logo mini" />
                </div>
                <div className="app-describe-zone item">
                  <div className="line-big">
                    <span className="app-name">{current_app.name}</span>
                  </div>
                  <div className="line-small">
                    {(bind_form && bind_form.loaded) ? (
                    <div className="bind-form-zone">
                      绑定表单：<a target="_blank"
                                 className="c-link-blue"
                                 id="bind-form"
                                 href={getFormUrl(bind_form.data.token)}>{bind_form.data.name}</a>
                    </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="line-big"></div>
                <div className="line-small">
                  <div className="app-menus-zone item">
                    {this.props.children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
