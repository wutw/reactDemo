import React from 'react';
export default class BodyIndex extends React.Component{
	componentWillMount(){//页面将要加载
		//钩子放这，定义自己的逻辑即可
		console.log('BodyIndex - componentWillMount');

	}
	componentDidMount(){
		console.log('BodyIndex - componentDidMount');
	}
	render(){
		let userName = 'ww';
		let boolInput = true;
		let html ="hello\u0020 world";
		//$nbsp;不会解析，转成相应unicode编码即可

		return(
			<div>
				<p>页面主体</p>
				<p>{userName==''? '用户未登录':`用户名：${userName}`}</p>  {/*三元表达式*/}
				<p><input type="button" value= {userName} disabled= {boolInput}/></p>

	            {/*绑动态值时注意去掉双引号*/}
				<p> {html}</p>  {/*空格解析*/}

			</div>
			)
	}
}
