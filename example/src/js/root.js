import React from 'react';
import ReactDOM from 'react-dom';
import Index from './index.js';
import Detail from './components/detail.js';
import DetailSub from './components/detailSub.js';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
class Root extends React.Component{
	render(){
		return(
			<Router history={hashHistory}>
			<Route path='/'>
			<IndexRoute component={Index}/>
			<Route path='detail/:id' component={Detail}/>
			<Route path='detailSub' component={DetailSub}/>
			</Route>
			</Router>
			)


	}
}


ReactDOM.render(<Root/>,document.getElementById('example'));