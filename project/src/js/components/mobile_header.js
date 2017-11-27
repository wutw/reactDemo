import React from 'react';
import { Layout, Menu, Icon, Modal, Tabs, message, Input, Form, Button, CheckBox } from 'antd';
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import { Router, Route, Link, hashHistory } from 'react-router'
class MobileHeader extends React.Component {
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
    setModalVisible(value) {
        this.setState({
            modalVisible: value
        })
    }
    handleClick(e) {
        /*console.log('click',e);*/
        if (e.key = 'register') {
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
    login(e) {
        this.setModalVisible(true);

    } //登录框展示
    callback(key) {
        if (key == 1) {
            this.setState({
                action: 'login'
            });
        } else if (key == 2) {
            this.setState({
                action: 'register'
            })
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
        if (this.state.action = 'login') {
            this.setState({
                hasLogined: true
            });
        }
        message.success('请求成功'); //成功提示 antd
        this.setModalVisible(false);





    } //页面开始提交

    render() {
        let {getFieldDecorator} = this.props.form;

        const userShow = this.state.hasLogined ?

            <Link to={'/usercenter'}>
      <Icon type='inbox'/>
      </Link>

            :
            <Icon type='setting' onClick={this.login.bind(this)}/>

        return (
            <div id='mobileheader'>
      <header>
      <img src='./src/image/logo.png' alt='logo'/>
      <span>ReactNews</span>
         {userShow}
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
        
      </header>
      </div>
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);