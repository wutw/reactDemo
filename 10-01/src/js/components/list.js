import React from 'react';
export default class ComponentList extends React.Component{
	//{this.props.params.id}取得页面传回的参数id
	render(){

		return (
			<div>
			<h2>这里是列表页面 Id:{this.props.params.id}</h2>
			</div>
		);
	}
}