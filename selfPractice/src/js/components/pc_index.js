import React from 'react' ;
import PCHeader from './pc_header';
import { Layout } from 'antd';
import PCContainer from './pc_container'
const {Header, Footer, Sider, Content} = Layout;

export default class PCIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            menuHeight: '64px',
            menuPosition: 'static',
            menuTop: '0',
            loginBtnShow: 'show',
            menuZIndex: 1



        };
    }
    componentWillMount() {
        this.regScroll.call(this, this.scrollStyle.bind(this));
    }
    componentWillUnmount() {
        window.onscroll = '';
    }
    regScroll(myHandler) {
        if (window.onscroll == null) {
            window.onscroll = myHandler;
        } else if (typeof window.onscroll == 'function') {
            var oldHandler = window.onscroll;
            window.onscroll = function() {
                myHandler;
                oldHandler;

            }
        }
    }

    scrollStyle(e) {

        let scrollY = (e.currentTarget.scrollY || e.currentTarget.pageYOffset);

        if (scrollY >= 200) {
            this.setState({
                menuPosition: 'fixed',
                menuTop: 0,
                loginBtnShow: 'none',


            })



        } else if (scrollY <= 100) {
            this.setState({
                menuPosition: 'static',
                loginBtnShow: 'show',
                menuTop: 0,


            })

        }

    }
    render() {

        let menuStyle = {
            height: this.state.menuHeight,
            position: this.state.menuPosition,
            top: this.state.menuTop,
            zIndex: this.state.menuZIndex,


        }
        let {loginBtnShow, menuHeight, imageBlockMarginTop} = this.state;

        return (
            <div>
                <Layout style={{
                backgroundColor: '#fff'
            }}>
                    <Header style={{
                backgroundColor: '#ffffff'
            }}>
                    <PCHeader menuStyle = {menuStyle}  loginBtnShow={loginBtnShow}/>
                    </Header>
                    <Content>
                    <PCContainer lineHeight = {menuHeight}/>
                    </Content>
                    <Footer style={{
                textAlign: 'center'
            }}>
                    @2017 created by wtw
                    </Footer>
                </Layout>
            </div>
        );
    }
}