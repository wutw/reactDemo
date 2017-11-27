import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index';
import ComponentList from './components/list';
import ComponentDetails from './components/detail';
import ComponentSub from './components/detailSub';
import {Router,Route,hashHistory,IndexRoute } from 'react-router';

export default class Root extends React.Component{
 //这里替换了Index，成为程序的入口，
			//history管理前进、后退
			//component={Index} path='/'使得访问localhost:8080时访问到index文件
			// component={ComponentList} path='list'使得访问localhost:8080/list时访问ComponentList页面
			//detail嵌套在主页面
			//path="/list/:id"在定义路径的同时传递参数
  render(){
    return (
      
      <Router history={hashHistory}>

        <Route path="/">
        <IndexRoute component={Index} ></IndexRoute>
          <Route component={ComponentDetails} path="detail"></Route>
           <Route component={ComponentSub} path="detailSub"></Route>
           
        </Route>

       <Route component={ComponentList} path="list/:id" ></Route>

      </Router>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('example'));
