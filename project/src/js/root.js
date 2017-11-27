import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
import PCUserCenter from './components/pc_usercenter';
import { createStore } from 'redux';
import MobileUserCenter from './components/mobile_usercenter';
import reducer from './reducers';



export default class Root extends React.Component {
    inc() {
        return {
            type: 'ADD'
        }
    }
    dec() {
        return { //action
            type: 'SUB'
        }
    }
    componentDidMount() {
        //初始化，传递的参数是reducer，
        var store = createStore(reducer); //store结合reducer管理state，接收函数为参数，生成store对象
        console.log(store.getState()); //把保存的state输出
        store.dispatch(this.inc()); //store.dispatch方法会触发 Reducer 的自动执行
        store.dispatch(this.inc()); //ui触发方法dispatch,this.inc()返回一个action,action有对应的type属性

        console.log(store.getState()); //读取store对象当前状态

    }

    render() {
        return (


            <div>
      <MediaQuery query='(min-device-width:1224px)'>
      <Router history ={hashHistory}>
      <Route path="/" component={PCIndex}/>
       <Route path="/details/:uniquekey" component={PCNewsDetails}/>
       <Route path="/usercenter" component={PCUserCenter}/>
      
       </Router>
      </MediaQuery>
       <MediaQuery query='(max-device-width:1224px)'>
          <Router history ={hashHistory}>
         <Route path="/" component={MobileIndex}/>
         <Route path="/details/:uniquekey" component={MobileNewsDetails}/>
         <Route path="/usercenter" component={MobileUserCenter}/>
     </Router>
      </MediaQuery>
      </div>

        );
    }
    ;
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
