import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import MobileListLoading from './mobile_list_loading';

import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
    constructor() {
        super();

    }
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
               <MobileHeader/>

                    <Carousel {...settings}>
                        <div><img src='./src/image/carousel_1.jpg'/></div>
                        <div><img src='./src/image/carousel_2.jpg'/></div>
                        <div><img src='./src/image/carousel_3.jpg'/></div>
                        <div><img src='./src/image/carousel_4.jpg'/></div>
        
                    </Carousel>

                   
                    <Tabs>
                    
                        <TabPane tab="头条" key='1'>
                            <MobileListLoading count={20} type='top'/>
                         </TabPane>
                        <TabPane tab="社会" key='2'>
                            <MobileList count={20} type='shehui'/>
                        </TabPane>
                         <TabPane tab="国内" key='3'>
                            <MobileList count={20} type='guonei'/>
                        </TabPane>
                        <TabPane tab="国际" key='4'>
                            <MobileList count={20} type='guoji'/>
                        </TabPane>
                        <TabPane tab="社会" key='5'>
                            <MobileList count={20} type='shehui'/>
                        </TabPane>
                        <TabPane tab="娱乐" key='6'>
                            <MobileList count={20} type='yule'/>
                        </TabPane>
                    </Tabs>
                <MobileFooter/>
             </div>


        )
    }
}