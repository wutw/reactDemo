import React from 'react' ;
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import pcCss from '../scss/pc.scss';
import mobileCss from '../scss/mobile.scss';
import UserCenter from './components/userCenter';

export default class Root extends React.Component {


    render() {
        return (
            <div>
				<MediaQuery query='(min-device-width:1224px)'>
					<Router history = {hashHistory}>
						<Route  path='/' component={PCIndex}/>
						<Route  path='/userCenter/:username' component={UserCenter}/>
						

					</Router>
				</MediaQuery>
				<MediaQuery query='(max-device-width:1224px)'>
					<Router>
						<Route  path='/' component={MobileIndex}/>

					</Router>
				</MediaQuery>
			</div>


        )

    }
}


ReactDOM.render(<Root/>, document.getElementById('container'));