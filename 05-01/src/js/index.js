/**
 * Created by wtw on 2017/10/27.
 */
 var React = require('react');
 var ReactDOM = require('react-dom');
import ComponentHeader from './components/header';
class Index extends React.Component{

	render(){
		return (
			<div>
			<ComponentHeader/>
			<h2>页面的内容</h2>
			</div>
			
		);

	}
}
ReactDOM.render(
	<Index/>,document.getElementById('example'));//绑定DOM元素
 
 /*ReactDOM.render(
    <h1>Hello girl!</h1>,
    document.getElementById('example')
 );*/