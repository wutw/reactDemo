
import React from 'react';
import footerCss from '../../css/footer.css'

export default class ComponentFooter extends React.Component{
	
	render(){
		let footer = {
		'div':{
			'margin':'10px'
		},
		'h2':{
			'margin':'10px'
		}
	}
		return (
			<div className={footerCss.miniFooter} style={footer.div}>
			<h2 style={footer.h2}>footer</h2>
			</div>
			)
	}
	
}