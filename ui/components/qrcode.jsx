import React from 'react'
import QRCodeReact from 'qrcode.react'

export default class QRCode extends QRCodeReact {
  toDataURL(){
    return this.refs.canvas.toDataURL();
  }
  render() {
    var style = this.props.style || {};
    return (
      <canvas style={{ height: this.props.size,
                       width: this.props.size,
                       ...style }}
              height={this.props.size}
              width={this.props.size}
              ref="canvas" />
    );
  }
}
