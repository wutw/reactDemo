import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router'
import { Row, Col } from 'antd';
import Tloader from 'react-touch-loader'; //滑动刷新

export default class MobileList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
            count: 5,
            hasMore: 0,
            initializing: 1, //初始化上拉刷新

        }
    }
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'


        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json())
            .then(json => this.setState({
                news: json
            }));

    }


    loadMore(resolve) {
        var myFetchOptions = {
            method: 'GET'


        };
        var self = this;

        setTimeout(() => {
            var count = this.state.count;
            self.setState({
                count: count + 5,
            });

            fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule&count=" + self.state.count, myFetchOptions).then(response => response.json())
                .then(json => self.setState({
                    news: json
                }));
            self.setState({
                hasMore: count > 0 && count < 50
            });
            resolve();
        }, 2e3);
    }
    componentDidMount() {
        let self = this;
        setTimeout(() => {
            self.setState = {
                hasMore: 1,
                initializing: 2 //组件初始化完成

            };
        }, 2e3);
    }
    render() {
        const {news, hasMore, initializing} = this.state;

        console.log(news);
        const newsList = news.length
            ?
            news.map((newsItem, index) => (
                <section key={index} className='m_article list_item special_section clearfix'>

                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        <div class='m_article_img'>
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className='m_article_info'>
                            <div className='m_article_title'>
                                <span>{newsItem.title}</span>
                            </div>
                        
                            <div className='m_article_desc clearfix'>
                                <div className='m_article_desc_l'>
                                    <span className='m_article_channel'>{newsItem.realType}</span>
                                    <span className='m_article_time'>{newsItem.date}</span>
                                </div>
                            </div> 
                        </div>
                    </Link>
                </section>


            ))
            :
            `没有加载到任何新闻`;


        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Tloader className='main' onLoadMore={(resolve) => this.loadMore(resolve)} hasMore={hasMore} initializing={initializing}> 
                        
                          {newsList}
                     
                        </Tloader>
                    </Col>
                </Row>
            </div>

        );
    }
    ;
}