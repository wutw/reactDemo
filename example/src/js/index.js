import React from 'react';
import ReactDOM from 'react-dom';
import ComponentHeader from './components/header.js';
import ComponentFooter from './components/footer.js';
import BodyIndex from './components/bodyIndex.js';

export default class Index extends React.Component{
	constructor(){
		super();
		this.state = {
			opacity:1
		}
	}
	componentWillMount(){
		console.log('Index -- componentWillMount')
	}
	componentDidMount(){
		this.timer = setInterval(function(){
			let opacity = this.state.opacity;
			opacity = opacity -0.05;
			if(opacity<0.1){
				opacity = 1;
			}
			this.setState({
				opacity:opacity
			});
		}.bind(this),10000);//绑定this

		}
	render(){
		//{{两层嵌套}}
		return(
			<div style = {{opacity:this.state.opacity}}>


			<ComponentHeader/>
			<BodyIndex groupId={2} groupName={'body'}/>
			<div>{this.props.children}</div>
			<ComponentFooter/>
			</div>

			)
	}

}


