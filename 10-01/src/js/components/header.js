import React from 'react';
import {Link} from 'react-router';//react-router里跳转
export default class ComponentHeader extends React.Component{
	constructor(){
		super();
		this.state ={
			miniHeader:false//默认加载时头部高

		}
	};
	

    render(){
  	  const styleComponentHeader = {
  	   header:{
  		backgroundColor:"#333",
  		color:"#ffffff",
  		paddingTop: (this.state.miniHeader) ? '3px' : '15px', 
  		paddingBottom: (this.state.miniHeader) ? '3px' : '15px'
  	},

  	//位置在render函数里，return前，属性名驼峰形式或字符串保存原生值
 
  }
    return (
      <header style={styleComponentHeader.header} >
       <ul>
       <li>  <Link to={'/'}>首页</Link></li>
         <li>  <Link to={'/list/1234'}>列表页面</Link></li>
        <li>  <Link to={'/detail'}>详情页面</Link></li>
        
       </ul>


      </header>
    )
  }
}
