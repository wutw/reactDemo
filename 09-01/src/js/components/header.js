import React from 'react';

export default class ComponentHeader extends React.Component{
	constructor(){
		super();
		this.state ={
			miniHeader:false//默认加载时头部高

		}
	};
	switchHeader(){
		this.setState({
			miniHeader:! this.state.miniHeader
		});

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
      <header style={styleComponentHeader.header} 
      onClick={this.switchHeader.bind(this)}>
        <h1>这里是头部</h1>
      </header>
    )
  }
}
