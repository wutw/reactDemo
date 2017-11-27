import React from 'react' ;
import { Menu, Button, Row, Pagination, Col, Badge, Popover, Tabs, Carousel, Card, Select, Icon, } from 'antd';
const TabPane = Tabs.TabPane;

const Option = Select.Option;
import { Link } from 'react-router'
export default class PCContainerImageBlock extends React.Component {

    constructor() {
        super();
        this.state = {
            news: '',
            imagesWidth: '22%',
            likeCount: localStorage.likeCount || 0,
            dislikeCount: localStorage.dislikeCount || 0,
            pageSize: 8,
            total: 500,
            currentPage: 1,
            searchPageSize: 8,
            oldNewsNum: 0

        };


    }
    componentWillMount() {
        localStorage.likeCount = this.state.likeCount;
        localStorage.dislikeCount = this.state.dislikeCount;
        this.searchNews.call(this);

    }
    searchNews() {
        var myFetchOptions = {
            method: 'GET'


        };

        console.log('searchPageSize', this.state.searchPageSize);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.searchPageSize, myFetchOptions).then(response => response.json())
            .then(json => {
                this.setState({
                    news: json

                })

            }

        );
    }
    changePage(pageNumber, pageSize) {
        //点击改变页码
        this.setState({
            currentPage: pageNumber,
            pageSize: pageSize,
            searchPageSize: (pageNumber) * pageSize,
            oldNewsNum: (pageNumber - 1) * pageSize

        });
        setTimeout(() => {
            this.searchNews.call(this)
        }, 0);




    }
    showTotal(e) { //展示条数
        (total, range) => `共${this.state.total}条，当前${range[0]}-${range[1]}条`
    }

    onShowSizeChange(current, pageSize) { //改变每页显示数目
        this.setState({
            currentPage: current,
            pageSize: pageSize,
            searchPageSize: current * pageSize,
            oldNewsNum: (current - 1) * pageSize
        }); //每页条数
        setTimeout(() => this.searchNews.call(this), 0);

    }

    evaluation(e) {

        if (e.target.className.indexOf('anticon-dislike') > -1) {
            this.setState({
                dislikeCount: ++localStorage.dislikeCount

            })
        } else if (e.target.className.indexOf('anticon-like') > -1) {
            this.setState({
                likeCount: ++localStorage.likeCount
            })
        }



    }
    render() {
        const imageStyle = {
            width: this.state.imagesWidth,
            float: 'left',
            padding: '1%'
        };


        //气泡内容
        let content = (
        <div onClick ={this.evaluation.bind(this)} >
                <Badge count={this.state.likeCount} overflowCount={9} showZero>
                    <Icon type="like" style={{
            color: 'green',
            fontSize: '28px'
        }}   />
                </Badge>


                <Badge count={this.state.dislikeCount} overflowCount={33} showZero>
                    <Icon type="dislike" style={{
            color: 'red',
            fontSize: '28px'
        }}  />
                </Badge>
            </div>
        );


        let imageBlock = this.state.news.length
            ?
            this.state.news.map((item, index) => {
                if (index >= this.state.oldNewsNum) {
                    return (
                        <div className = 'imageNews' key ={index}>

                <Link to={`detail/${item.uniquekey}`} target='_blank'>
                    <div style={imageStyle} >
                        <img alt='image' width='100%' src={item.thumbnail_pic_s}/>
                    </div>
                    <div style={{
                            float: 'left'
                        }}>

                        <h2>{item.title}</h2>
                        <p> {item.author_name}
            <span >
            <Popover content={content}>
                <Icon type="heart-o" style={{
                            color: 'blue'
                        }} />
            </Popover>
            </span>
                        </p>
                    </div>
                </Link>
            </div>
                    )
                }
            }

            )

            :
            '没有加载任何新闻';

        //分页设置
        let pageProps = {
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange.bind(this),
            showQuickJumper: true,
            current: this.state.currentPage,
            total: this.state.total,
            pageSize: this.state.pageSize,
            onChange: this.changePage.bind(this),
            showTotal: this.showTotal.bind(this)
        }


        return (
            <div>
<Card bodyStyle = {{
                padding: 0
            }}>
{imageBlock}
</Card>

<Pagination style={{
                margin: '18px 0'
            }} {...pageProps} />
</div>

        )
    }
}