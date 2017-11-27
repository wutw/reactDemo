import React from 'react';
import footerCss from '../../css/footer.css';//import进来引用

export default class ComponentFooter extends React.Component{
	render(){
		let footerConvertStyle={
			'miniFooter':{
				'margin':'10px'
			},
			'miniFooter_h2':{
				'fontWeight':'100'
			}
		}
		console.log(footerCss);
		return(
		
			<footer style = {footerConvertStyle.miniFooter} class = {footerCss.miniFooter} >
			<h2 style={footerConvertStyle.miniFooter_h2}>这里是页脚</h2>
			</footer>

			)
	}
}