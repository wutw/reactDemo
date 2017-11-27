var React = require('react');
var ReactDOM = require('react-dom');
import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';//.js可省
import BodyIndex from './components/bodyIndex';//.js可省

export default class Index extends React.Component {

	componentWillMount(){
		console.log('Index - componentWillMount');

	}
	componentDidMount(){
		console.log('Index - componentDidMount');
	}
	render() {
		
		{/*
		if(用户已登录){
			component = <ComponentLoginHeader/>
		}else{
			component = <ComponentHeader/>
		}  //伪代码 */
		/*1个return里只能有一个html节点，多个用div包裹

		 组件化，可用参数代替组件名，移植性好 

		{this.props.children} ：children属性，可展示root.js定义的嵌套的子页面*/}

		return (
		
			
			<div>    
			   <ComponentHeader/>
				<BodyIndex userId={11} userName={"name"}/>
				<div>
				{this.props.children}
				</div>
				<ComponentFooter/>
			</div>
		);
	}
}
