import React from 'react';
import { Layout, Menu, Icon, Modal, notification, Tabs, Card, Row, Col, BackTop, message, Input, Form, Button, CheckBox } from 'antd';
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import { Router, Route, Link, hashHistory } from 'react-router'
//根据文章id把评论展示
class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
            value: ''
        }
    }
    componentDidMount() { //加载评论
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                comments: json
            });
            console.log(json);
        });
    }
    handleSubmit(e) { //添加评论
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formdata = this.props.form.getFieldsValue();

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.getItem('userId') + '&uniquekey=' + this.props.uniquekey + '&commnet' + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
            this.componentDidMount.call(this); //页面查询加载，查询评论,uniquekey相当于文章id
            //this.props.form.resetFields(['add_comment']);
            this.setState({
                value: ''
            });
        });
    }
    //input框实时值保存
    valuePreserve(e) {
        let value = e.target.value;
        this.setState({
            value: value
        })

    }
    //收藏功能
    addUserCollection(e) {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.getItem('userId') + '&uniquekey=' + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            //收藏成功后全局提醒
            notification.config({
                placement: 'bottomRight',
                duration: 3
            })
            notification['success']({
                message: 'ReactNews提醒',
                description: '收藏此文章成功'
            });
        })
    }

    render() {

        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commnetList = comments.length
            ?
            comments.map((comment, index) => (
                //extra卡片右上角操作区域
                <Card key={index} title = {comment.UserName} extra={<a href='#'>发布于{comment.datetime}</a>}>
		  			<p>{comment.Comments}</p>commnet
		  	    </Card>
            ))
            : '没有加载到任何评论';

        return (
            <div class='comment'>
            	{commnetList[commnetList.length - 1]}
				<Row>
					<Col span={24}>
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label='您的评论'>{getFieldDecorator('remark', {
                initialValue: ''
            }), (
            <Input  type='textarea' placeholder='' value={this.state.value} onChange={this.valuePreserve.bind(this)}/ >
            )}
							</FormItem>
							<Button type='primary' htmlType='submit'>提交评论</Button>
							  
							<Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>
							收藏
							</Button>
                          
						</Form>
					</Col>
				</Row>
			</div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);