import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const {Header, Content, Footer} = Layout;
export default class MobileFooter extends React.Component {
    render() {
        return (
            <Footer className='footer' style={{
                textAlign: 'center'
            }}>
			@2017 Created by WTW
			</Footer>
        )
    }
}