import React from 'react';
import { Row, Col, Icon } from 'antd';
import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsImageBlock from './pc_news_image_block';
import PCNewsBlock from './pc_news_block';
import PCProduct from './pc_products';
export default class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            adaptiveHeight: true,
            slidesToShow: 1,
            autoplay: true
        }
        return (
            <div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className = 'container'>
					<div class="leftContainer">
						<div class='carousel'>
							<Carousel {...settings}>
								<div><img src='./src/image/carousel_1.jpg'/></div>
								<div><img src='./src/image/carousel_2.jpg'/></div>
								<div><img src='./src/image/carousel_3.jpg'/></div>
								<div><img src='./src/image/carousel_4.jpg'/></div>
				
							</Carousel>

						</div>
						<PCNewsImageBlock count={6} type='guoji' width='400px' cardTitle='国际头条' imageWidth='112px'/>
					</div>
					<Tabs class='tabs_news'>
						<TabPane tab='头条' key='1'>
							<PCNewsBlock count={20} type='top' width='100%' bordered='false'/>
                            { /*count 新闻数量，type:新闻类型*/ }
						</TabPane>
						<TabPane tab='国际' key='2'>
							<PCNewsBlock count={20} type='guoji' width='100%' bordered='false'/>
                           
						</TabPane>
					</Tabs>
					<Tabs>
						<TabPane tab='ReactNews 产品' key='1'>
						<PCProduct/>
						</TabPane>
					</Tabs>
					<div>
					<PCNewsImageBlock count={8} type='guonei' width='100%' cardTitle='国内' imageWidth='112px'/>
					<PCNewsImageBlock count={16} type='yule' width='100%' cardTitle='娱乐' imageWidth='112px'/>
				
					</div>


					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
        )
    }
}