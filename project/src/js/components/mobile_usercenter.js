import React from 'react';
import { Layout, Menu, Upload, Icon, Modal, notification, Tabs, Card, Row, Col, BackTop, message, Input, Form, Button, CheckBox } from 'antd';
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
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
        const {userCollection, userComments} = this.state;
        const userCollectionList = userCollection.length
            ?
            userCollection.map((uc, index) => (
                <Card key = {index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>} >
				<p>{uc.Title}</p>
        	</Card>
            ))
            :
            '您还没有收藏任何文章哦';

        const userCommentsList = userComments.length ?
            userComments.map((comment, index) => (
                <Card key = {index} title={`于${comment.datetime}评论了文章`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>} >
				<p>{comment.Comments}</p>
        	</Card>

            ))
            :
            '您还没有评论任何文章哦';


        //返回一个节点，用div包起来
        return (
            <div>
			<MobileHeader/>
			<Row>
				
				<Col span='24'>

					<Tabs>
			
						<TabPane tab='我的收藏列表' key='1'>
						<Row>
									<Col span={24}>
											{userCollectionList}
											
									</Col>
								</Row>
						
						</TabPane>
						<TabPane tab='我的评论列表' key='2'>
							<Row>
									<Col span={24}>
											{userCommentsList}
											
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
				

	
			
				</Row>
				<MobileFooter/>
			</div>
        )
    }
}