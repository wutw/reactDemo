import React from 'react';
var ReactDOM = require('react-dom');
import BodyChild from './bodyChild';
import MixinLog from './mixins';//调公共函数log
import ReactMixin from 'react-mixin';//公共方法
/*import 'antd/dist/antd.css'; //引入样式*/
import {Input} from 'antd';//引入输入框模块
const defaultProps ={
	userName:'默认值'
}
export default class BodyIndex extends React.Component{
	constructor(){
		super();//调用基类所有初始化方法
		this.state ={username:'Parry',age:'20'};
		//state初始化，自身state不会影响到其他组件
	}
	changeStatus(){
		this.setState({username:'change!'});
		var mySubmitButton = document.getElementById('submitButton');
		/*console.log(mySubmitButton);
		mySubmitButton.style.color = 'red';
		ReactDOM.findDOMNode(mySubmitButton).style.color = 'red';*/
		console.log(this.refs.submitButton);
		this.refs.submitButton.style.color = 'red';
		MixinLog.log();//执行类MixinLog的方法

	}
	handleChildValueChange(e){
		this.setState({age:e.target.value})
	}
	render(){
	{/*state状态更新*/}
		{/*setTimeout(()=>{this.setState({username:'bab',age:'11'});},4000)*/}
		
		return(
			<div>
				<p>页面主体</p>
				<Input placeholder="Basic usage" />//调用ant design默认样式的input框
				<p>{this.state.username}{this.state.age} </p>
				<p>{this.props.userId}</p>
				<p>{this.props.userName}</p>
				<input type='button' ref='submitButton' id="submitButton" value='change' onClick={this.changeStatus.bind(this)}/>
				<BodyChild  {...this.props} id={2} handleChild = {this.handleChildValueChange.bind(this)}/>
			</div>
			)
	}
}
BodyIndex.propTypes = {
	userId:React.PropTypes.number.isRequired//验证规则
};
BodyIndex.defaultProps = defaultProps;//父级传值初始值
ReactMixin(BodyIndex.prototype,MixinLog);//让两个对象合并