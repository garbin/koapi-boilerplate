import React from 'react'
import {connect} from '../../lib/helper'
import * as instance_actions from '../../actions/instance'
import QRCode from '../../components/qrcode'
import {getInstanceUrl} from '../../lib/helper'

export class QRCodeContainer extends React.Component {
  componentDidUpdate(){
    if (this.props.instance.loaded) {
      this.refs['qrcode-small'].href = this.refs.small.toDataURL();
      this.refs['qrcode-medium'].href = this.refs.medium.toDataURL();
      this.refs['qrcode-large'].href = this.refs.large.toDataURL();
    }
  }
  render(){
    let {instance} = this.props;
    return (
      <div className="app-data-zone">
        <div className="app-data-header">
          <div className="row">
            <div className="col-sm-6"><i className="glyphicon glyphicon-qrcode"></i>&nbsp;二维码发布
            </div>
            <div className="col-sm-6 text-right"></div>
          </div>
        </div>
        <div className="app-data-list">
          <div className="qrcode-dialog">
            <div className="qrcode-content">
              <div className="title-zone">
                <span className="title">活动组织者可以打印以下二维码，置于于会场入口。</span><br/>
                <span className="des">手机扫一扫即可体验</span>
              </div>
              <div className="image-zone">
                <QRCode size={256} value={getInstanceUrl(instance.data)} />
                <QRCode size={512} value={getInstanceUrl(instance.data)} style={{display:'none'}} ref="small" />
                <QRCode size={1024} value={getInstanceUrl(instance.data)} style={{display:'none'}} ref="medium" />
                <QRCode size={1680} value={getInstanceUrl(instance.data)} style={{display:'none'}} ref="large" />
              </div>
              <div className="download-zone">
                <div className="des">下载大尺寸二维码</div>
                <div className="link-zone">
                  <a className="c-link-blue" ref="qrcode-small" download="qrcode-small.png" target="_blank">小号</a>|
                    <a className="c-link-blue" ref="qrcode-medium" download="qrcode-medium.png" target="_blank">中号</a>|
                      <a className="c-link-blue" ref="qrcode-large" download="qrcode-medium.png" target="_blank">大号</a>
                    </div>
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
                                   instance_actions )(QRCodeContainer);
