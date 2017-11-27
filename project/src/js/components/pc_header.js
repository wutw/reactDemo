import React from 'react';
import { Layout, Menu, Icon, Modal, Tabs, message, Input, Form, Button, CheckBox } from 'antd';
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import { Router, Route, Link, hashHistory } from 'react-router'

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', //当前选定导航栏
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: 0


        }
    }
    callback(key) { //传入TabPanes的key
        if (key == 1) {
            this.setState({
                action: 'login'
            });
        } else if (key == 2) {
            this.setState({
                action: 'register'
            });
        }
    }
    ;

    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    }
    handleClick(e) {
        /*console.log('click',e);*/
        if (e.key == 'register') {
            this.setState({
                current: 'register'
            });
            this.setModalVisible(true);
        } else {
            this.setState({
                current: e.key
            });
        }

    }
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue(); //获得form表单值
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
            + this.state.action
            + "&username=" + formData.userName + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName + "&r_password="
            + formData.r_password + "&r_confirmPassword="
            + formData.r_confirmPassword, myFetchOptions) //手动格式化
            .then(response => response.json()) //json格式化
            .then(json => { //格式化结果
                console.log(json);
                this.setState({
                    userNickName: json.NickUserName,
                    userId: json.UserId
                });
                localStorage.userId = json.UserId; //存入本地存储中
                localStorage.userNickName = json.NickUserName;

            });
        if (this.state.action == 'login') {
            this.setState({
                hasLogined: true
            });
        }
        message.success('请求成功'); //成功提示 antd
        this.setModalVisible(false);





    } //页面开始提交
    logout() {
        localStorage.userId = ''; //存入本地存储中
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false
        });

    }

    render() {
        let {getFieldDecorator} = this.props.form;
        //三元表达式，判断是否登录成功
        const userShow = this.state.hasLogined ?
            <Menu.Item key='logout' class='register'>
    <Button  type='primary' htmlType='button'>{this.state.userNickName}</Button>
  
    <Link style={{
                float: 'left'
            }} target="_blank" to={`/usercenter`} >
    <Button type='dashed' htmlType='button'>个人中心</Button>
    </Link>
   
    <Button  type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
    </Menu.Item>
            :
            <Menu.Item key='register' class='register'>
    <Icon type='appstore'/>注册/登录
    </Menu.Item>;





        let pcHeaderCss = {
            logo: {
                width: '45px',
                height: '45px',
                background: '#fafafa',
                borderRadius: '6px',
                margin: '10px 35px 0 0',
                float: 'left'
            }
        }

        return (

            <Header style={{

                width: '100%'
            }}>
           <div className='logo' style={pcHeaderCss.logo}>
               <img src='./src/image/logo.png' alt='logo'/>
           </div>
            <Menu theme="dark" mode="horizontal" selectedKeys={[this.state.current]} style={{
                lineHeight: '64px'
            }} onClick={this.handleClick.bind(this)} >
                <Menu.Item key="top"><Icon type='mail'/> 头条</Menu.Item>
                <Menu.Item key="shehui"><Icon type='setting'/> 社会</Menu.Item>
                <Menu.Item key="guonei"><Icon type='mail'/> 国内</Menu.Item>
                <Menu.Item key="guoji"><Icon type='mail'/> 国际</Menu.Item>
                <Menu.Item key="yule"><Icon type='setting'/> 娱乐</Menu.Item>
                <Menu.Item key="tiyu"><Icon type='mail'/> 体育</Menu.Item>
                <Menu.Item key="keji"><Icon type='setting'/> 科技</Menu.Item>
                {userShow}
            </Menu>

            <Modal title='用户中心' wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText='关闭'>
                <Tabs type='card' onChange={this.callback.bind(this)}>
                <TabPane tab="登录" key="1">
                    <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                        <FormItem label="账户">
                            {getFieldDecorator('userName', {
                rules: [{
                    required: true,
                    message: 'Please input your username!'
                }],

            })(
                <Input prefix={<Icon type='user' style={{
                    fontSize: 13
                }} />} placeholder='请输入您的账户' />

            )}
                                           
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: 'Please input your password!'
                }],

            })(
                <Input prefix={<Icon type="lock" style={{
                    fontSize: 13
                }} />} type='password' placeholder='请输入您的密码' />
            )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </TabPane>
                    <TabPane tab='注册' key='2'>
                        <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label='账户'>
                                {getFieldDecorator('r_userName', {
                rules: [{
                    required: true,
                    message: 'Please input your username!'
                }],

            })(
                <Input prefix={<Icon type='user' style={{
                    fontSize: 13
                }} />} placeholder='请输入您的账户' />
            )
            }
                            </FormItem>
                             <FormItem label='账户密码'>
                             {getFieldDecorator('r_password', {
                rules: [{
                    required: true,
                    message: '请输入您的密码'
                }]
            }

            )(
                <Input prefix={<Icon type="lock" style={{
                    fontSize: 13
                }} />} type='password' placeholder='请输入您的密码' />

            )}
                                 </FormItem>
                            <FormItem label='请确认密码'>
                               {getFieldDecorator('r_confirmPassword', {
                rules: [{
                    required: true,
                    message: '请再次确认您的密码'
                }]

            })(
                <Input type='password' placeholder='请再次确认您的密码'/>

            )}
                                </FormItem>
                            <Button type='primary' htmlType='submit' >注册</Button>
                        </Form>
                    </TabPane>
                </Tabs>

            </Modal>
        
        </Header>




        )
    }
}
export default PCHeader = Form.create({})(PCHeader); //2次封装