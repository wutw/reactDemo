var React = require('react');
var ReactDOM = require('react-dom');
import ComponentHeader from './components/header';
import ComponentFooter from './components/footer';//.js可省
import BodyIndex from './components/bodyIndex';//.js可省
class Index extends React.Component {

	componentWillMount(){//页面将要加载
		//钩子放这，定义自己的逻辑即可
		console.log('Index - componentWillMount');

	}
	componentDidMount(){
		console.log('Index - componentDidMount');
	}
	render() {
		var component = <ComponentHeader/>;
		{/*
		if(用户已登录){
			component = <ComponentLoginHeader/>
		}else{
			component = <ComponentHeader/>
		}  //伪代码 */
		/*1个return里只能有一个html节点，多个用div包裹

		 组件化，可用参数代替组件名，移植性好*/ }
		return (
		
			
			<div>    
			    {component}
				<BodyIndex/>
				<ComponentFooter/>
			</div>
		);
	}
}
ReactDOM.render(
	<Index/>, document.getElementById('example'));
