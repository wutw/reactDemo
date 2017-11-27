import React from 'react';
export default class ComponentDetails extends React.Component{
	render(){
		return(
			<div>
			<h1>
			主页面的details~~
			{this.props.params.id}
			</h1>
			</div>
			)
	}
}