import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newsContainer';
import { Layout, Menu, Breadcrumb } from 'antd';
const {Header, Content, Footer} = Layout;
export default class PCIndex extends React.Component {

    render() {
        return (
            <div>
    	<PCHeader/>
    	<PCNewsContainer/>
    	<PCFooter/>
    	</div>

        );
    }
}