import React from 'react'

export default class Page extends React.Component {
  render(){
    return (
      <div className="page"> {this.props.children} </div>
    );
  }
}
