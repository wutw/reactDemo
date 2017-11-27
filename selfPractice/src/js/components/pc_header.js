import React from 'react' ;
import { Menu, Modal, Button, Row, Col, Tabs, message, Dropdown, Form, Select, Icon, Input, Checkbox } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
import { Link } from 'react-router'


class PCHeader extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            visible: false,
            current: 'top',
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: '',
            confirmDirty: false,




        };
    }

    handleOk() {
        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false
            });
        }, 1000);
    } //登录表单点确定

    handleCancel() {
        this.setState({
            visible: false
        });
    } //登录表单取消

    handleSubmitCallback(formDate, myFetchOptions) {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action='
            + this.state.action + '&username =' + formDate.l_nickname
            + '$password=' + formDate.l_password
            + '&r_userName=' + formDate.nickname
            + '&r_password=' + formDate.password
            + '&r_confirmPassword=' + formDate.confirm
            + '&phone=' + formDate.phone, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userNickName: json.NickUserName,
                    userId: json.UserId,

                });
                localStorage.setItem('userNickName', json.NickUserName);
                localStorage.setItem('userId', json.UserId);
                if (this.state.action == 'login') {
                    this.setState({
                        hasLogined: true,

                    });
                }

                message.success('操作成功');
                this.props.form.resetFields();
                this.handleOk.apply(this);

            })


    }
    handleSubmit(e) {
        var myFetchOptions = {
            method: 'GET'
        };
        e.preventDefault();

        var formDate = this.props.form.getFieldsValue();
        this.props.form.validateFieldsAndScroll(['l_password', 'l_nickname'], (err, values) => {
            if (!err) {
                this.handleSubmitCallback.call(this, formDate, myFetchOptions);

            }
        })
        this.props.form.validateFieldsAndScroll(['password', 'nickname', 'confirm', 'phone'], (err, values) => {
            if (!err) {
                this.handleSubmitCallback.call(this, formDate, myFetchOptions);

            }
        })


    } //登录表单获取数据

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    } //判断确认密码输入完毕
    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!'); //错误提示
        } else {
            callback();
        }
    } //检验登录密码与检验密码是否一致

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) { //校验confirm
            form.validateFields(['confirm'], {
                force: true
            });
        }
        callback();
    } //确认密码检验

    changeStatus(e) {
        if (e.key == 'userButton') {
            this.setState({
                visible: true,
                current: 'userButton'
            })
        } else {
            this.setState({
                visible: false,
                current: e.key
            })

        }


    } //头标题选中，及模态框展示

    loginCallback(key) {

        this.setState({
            action: key
        })
    }

    //判断登录还是注册
    loginOut(e) {
        if (e.key == 'loginout') {


            localStorage.userNickName = '';
            localStorage.userId = '';
            this.setState({
                hasLogined: false
            })
        }
    }

    render() {
        const menuHeight = this.props.menuStyle;


        const menu = (
        <Menu onClick={this.loginOut.bind(this)}>
            <Menu.Item key="usercenter"><Link to={`/usercenter/${ localStorage.userNickName}`}>用户中心</Link></Menu.Item>
            <Menu.Item key="loginout" >退出</Menu.Item>

        </Menu>
        );
        const userButton = this.state.hasLogined ?
            <Menu.Item key='loginButton' className={this.props.loginBtnShow}>
            <Dropdown overlay={menu}>
                <Button>
                    {localStorage.userNickName}<Icon type='down'/>
                </Button>
            </Dropdown>

        </Menu.Item>
            :
            <Menu.Item key='userButton' className={this.props.loginBtnShow}>
            <Icon type="api" />注册/登录

        </Menu.Item>;

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{
                width: 60
            }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
        );

        return (
            <div>
            <Row>
             <Col span={2}>
             </Col>
            <Col span={4}>
            <div className='logo'>
                <img src='./src/images/logo.png' alt='logo'/>
            </div>
            </Col>
            <Col span={16} class='menu_title'>
            <Menu mode='horizontal' theme='light' style={menuHeight} className='menuStyle'
            defaultSelectedKeys={['1']} onClick={this.changeStatus.bind(this)}>
                <Menu.Item key='top'><Icon type="api" />头条</Menu.Item>
                <Menu.Item key='guoji'><Icon type="global" />国际</Menu.Item>
                <Menu.Item key='yule'><Icon type="gift" />娱乐</Menu.Item>
                <Menu.Item key='shehui'><Icon type="usergroup-add" />社会</Menu.Item>
                <Menu.Item key='tiyu'><Icon type="usergroup-add" />体育</Menu.Item>
                <Menu.Item key='keji'><Icon type="usergroup-add" />科技</Menu.Item>
                <Menu.Item key='guonei'><Icon type="usergroup-add" />国内</Menu.Item>
                
              {userButton}
            </Menu>

            <Modal visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>Return</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
              Submit
            </Button>,
            ]}>
                <Tabs defaultActiveKey='login' onChange={ this.loginCallback.bind(this)}>
                    <TabPane tab='登录' key='login' >
                        <Form onSubmit={this.handleSubmit.bind(this)} >

                            <FormItem {...formItemLayout} label='Nickname' hasFeedback>
                                {getFieldDecorator('l_nickname', {
                rules: [{
                    required: true,
                    initialValue: '',
                    message: 'please input your name',
                    whitespace: true
                }],
            })(<Input/>
            )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='password' hasFeedback>
                                {getFieldDecorator('l_password', {
                rules: [{
                    required: true,
                    initialValue: '',

                    pattern: /^[a-zA-Z0-9]{6,12}$/,
                    message: 'the password need contain number and chat,and the length between 6 to 9'
                }, {
                    validator: this.checkConfirm.bind(this)
                }],
            })(<Input type='password'/>
            )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Login</Button>
                            </FormItem>


                        </Form>

                    </TabPane>

                    <TabPane tab='注册' key='register' >


                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem {...formItemLayout} label='Nickname' hasFeedback>
                                {getFieldDecorator('nickname', {
                rules: [{
                    required: true,
                    initialValue: '',
                    message: 'please input your name',
                    whitespace: true
                }],
            })(<Input/>
            )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='password' hasFeedback>
                                {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    initialValue: '',

                    pattern: /^[a-zA-Z0-9]{6,12}$/,
                    message: 'the password need contain number and chat,and the length between 6 to 9'
                }, {
                    validator: this.checkConfirm.bind(this)
                }],
            })(<Input type='password'/>
            )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='confirm password' hasFeedback>
                                {getFieldDecorator('confirm', {
                rules: [{
                    required: true,
                    initialValue: '',
                    pattern: /^[a-zA-Z0-9]{6,12}$/,
                    message: 'the password need contain number and chat,and the length between 6 to 9,'
                }, {
                    validator: this.checkPassword.bind(this)
                }],
            })(<Input type='password' onBlur={this.handleConfirmBlur.bind(this)}/>
            )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='Phone Number' hasFeedback>
                                {getFieldDecorator('phone', {
                rules: [{
                    required: true,
                    initialValue: '',

                    pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
                    message: 'please input your phone number'
                }],
            })(<Input addonBefore={prefixSelector} style={{
                width: '100%'
            }}/>
            )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Register</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>





            </Modal>


        </Col>
        <Col span={2}>
        </Col>
        </Row>
        </div>

        );
    }
}


export default PCHeader = Form.create({})(PCHeader);
