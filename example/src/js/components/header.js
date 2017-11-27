import React from 'react';

import {Link} from 'react-router';

export default class ComponentHeader extends React.Component{
	render(){
		return (
			<div>
			<ul>
			<li><Link to={'/'}>首页</Link></li>
			<li><Link to={'/detail/1234'}>详情页</Link></li>
			<li><Link to={'/detailSub'}>详情页</Link></li>
			</ul>
			</div>
			)
	}
	
}