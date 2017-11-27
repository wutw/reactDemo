import React from 'react';
import { Layout, Menu, Icon, Modal, Upload, notification, Tabs, Card, Row, Col, BackTop, message, Input, Form, Button, CheckBox } from 'antd';
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { Router, Route, Link, hashHistory } from 'react-router'
//根据文章id把评论展示
export default class PCUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewImage: '',
            previewVisible: false,
            userCollection: '',
            userComments: ''


        }

    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercollection: json
                });
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    usercomments: json
                });
            });

    }
    ;
    render() {
        //返回一个节点，用div包起来
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file) => {
                this.setState({
                    previewImage: file.url,
                    previewVisible: true
                });
            }
        };
        const {userCollection} = this.state;
        const userCollectionList = userCollection.length
            ?
            userCollection.map((uc, index) => (
                <Card key = {index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>} >
				<p>{uc.Title}</p>
        	</Card>
            ))
            :
            '您还没有收藏任何文章哦';
        const {userComments} = this.state;
        const userCommentsList = userComments.length ?
            userComments.map((comment, index) => (
                <Card key = {index} title={`您于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>} >
				<p>{comment.Comments}</p>
        	</Card>

            ))
            :
            '您还没有评论任何文章哦';






        return (
            <div>
			<PCHeader/>
			<Row>
				<Col span='2'>

				</Col>
				<Col span='20'>

					<Tabs>
			
						<TabPane tab='我的收藏列表' key='1'>
							<div class='comment'>
							<Col span='2'>
													
									</Col>
									<Col span='20'>
										{userCollectionList}
													
									</Col>
								
							
								<Col span='2'>
													
									</Col>
											
							</div>
					
						</TabPane>
						<TabPane tab='我的评论列表' key='2'>
						<Row>
									<Col span='2'>
													
									</Col>

									<Col span={20}>
											{userCommentsList}
											
									</Col>
									<Col span='2'>
													
									</Col>
								</Row>
						</TabPane>
						<TabPane tab='头像设置' key='3'>
							<div class='clearfix'>
								<Upload {...props}>
									<Icon type='plus'/>
									<div className = 'ant-upload-text'>上传照片</div>
								</Upload>
								<Modal visible={this.state.previewVisible} footer={null}>
									<img alt='预览' src={this.state.previewImage}/>
								</Modal>
							</div>
						</TabPane>
						
					</Tabs>

				</Col>
				<Col span='2'>

				</Col>

		

			
				</Row>
				<PCFooter/>
			</div>
        )
    }
}