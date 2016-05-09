import {Link} from 'react-router'
import React from 'react'

export default class Navs extends React.Component {
  render(){
    let {params} = this.props;
    let tabs = [
      {icon: 'list-alt', to: 'admin/list', text:'签到结果'},
      {icon: 'cog', to: 'admin/setting', text:'签到配置'},
      {icon: 'qrcode', to: 'admin/qrcode', text:'二维码发布'},
      {icon: 'question-sign', to: 'admin/help', text:'帮助'}
    ];
    return (
      <div>
        {tabs.map((item, k) => (
          <Link key={k} activeClassName="active"
                to={'/' + params.release + '/i/' + params.slug + '/' + item.to}>
            <i className={'glyphicon glyphicon-'+item.icon}></i>&nbsp;{item.text}
          </Link>
        ))}
    </div>);
  }
}
