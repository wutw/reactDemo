import React from 'react';


export default class BodyChild extends React.Component{
	render(){
		return (
			<div>
			<h2>BodyChild</h2>
			<input onChange={this.props.handle}/>
			</div>
			)
	}
	
}