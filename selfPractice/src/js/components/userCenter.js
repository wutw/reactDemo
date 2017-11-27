import React from 'react' ;
import { Menu, Modal, Button, Row, Col, Upload, Tabs, Dropdown, Select, Icon, Input } from 'antd';
const TabPane = Tabs.TabPane;




export default class UserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        };
    }

    handleCancel() {
        this.setState({
            previewVisible: false
        });
    }
    handleChange({fileList}) {
        this.setState({
            fileList
        })
    }

    handlePreview(file) {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }





    render() {
        const {previewVisible, previewImage, fileList} = this.state;

        const uploadProps = {
            action: '//jsonplaceholder.typicode.com/posts/',
            listType: 'picture-card',
            fileList: fileList,
            onPreview: this.handlePreview.bind(this),
            onChange: this.handleChange.bind(this)


        };
        const uploadButton = (
        <div>
                <Icon type='plus'/>
                <div className='ant-upload-text'>上传</div>
            </div>
        );
        return (
            <div>
                <h3>亲爱的{this.props.params.username},请上传图片:</h3>
                <div className='clearfix'>
                    <Upload {...uploadProps}>
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                        <img alt='userImage' style={{
                width: '100%'
            }}/>
                    </Modal>

                </div>
                </div>


        )
    }

}