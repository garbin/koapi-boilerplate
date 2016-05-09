import React from 'react'

export default class Page extends React.Component {
  render(){
    return (
      <div className="page-jcontent">
        <div className="container">
          <div className="content-frame">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
