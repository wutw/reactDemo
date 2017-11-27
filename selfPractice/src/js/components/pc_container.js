import React from 'react' ;
import { Menu, Button, Row, Col, Affix, Tabs, Carousel, Select, Icon, } from 'antd';
const TabPane = Tabs.TabPane;
import PCContainerImageBlock from './pc_container_image_block'
const Option = Select.Option;
import { Link } from 'react-router'
export default class PCContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            contentPadding: '40px',

        };
    }
    render() {
        const settings = {
            autoplay: true,
            effect: 'fade'
        }
        const pc_content = {
            paddingTop: this.state.contentPadding
        }
        return (
            <div style = {pc_content}>
            <Row>
            <Col span='1'>
            </Col>
            <Col span='5'>
            </Col>
            <Col span='12'>
            <PCContainerImageBlock   type={'yule'} />

            </Col>
            <Col span='5'>
            <div class='carousel'>
            <Affix offsetTop = {Number.parseInt(this.state.contentPadding) + Number.parseInt(this.props.lineHeight)}>
            <Carousel {...settings}>
                <div><img src='./src/images/carousel_1.jpg'/></div>
                <div><img src='./src/images/carousel_2.jpg'/></div>
                <div><img src='./src/images/carousel_3.jpg'/></div>
                <div><img src='./src/images/carousel_4.jpg'/></div>
             </Carousel>
             </Affix>
             </div>
            </Col>
            <Col span='1'>
            </Col>
            </Row>

            </div>
        )
    }
}