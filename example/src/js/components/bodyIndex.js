import React from 'react';
import BodyChild from './bodyChild';
import Mixins from './mixins.js';
import ReactMixin from 'react-mixin';
export default class BodyIndex extends React.Component{
	constructor(){
		super();
		this.state={
			name:'aa',
			age:'12'
		}
	}
	changeState(e){
		this.setState({name:'bb',age:34});
		this.refs.input.style.color='red';
		var input = document.getElementById('input');
		input.style.fontSize = '15px';
		Mixins.log();

	}
	handl(e){
		this.setState({name:e.target.value});

	}

	render(){
		return (
			<div>
			<BodyChild {...this.props} handle = {this.handl.bind(this)}/>
			<h2>{this.props.groupName ==''?'用户名为空':'用户名'+ this.props.groupName}</h2>
			<h2>{this.props.groupId}:{this.props.groupName}</h2>
			<h2>name:{this.state.name}  age:{this.state.age}</h2>
			<input type='text' onChange={this.changeState.bind(this)} ref='input' id='input'/>
			</div>
			)
	}
	
}
BodyIndex.propTypes = {
	groupId:React.PropTypes.number.isRequired//userId约束,必须有，且为数字
};
BodyIndex.defaultProps ={
	groupId:22
};
ReactMixin(BodyIndex.prototype,Mixins);
