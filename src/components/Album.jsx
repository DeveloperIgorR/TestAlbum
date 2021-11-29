import React, { useEffect, useState } from 'react'
import { List, Avatar, Space, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { instance } from '../services/instance';

const Album = () => {
    
    const[images,setImages] = useState([])
    console.log(images)

    useEffect(() => {
        getImages()
    })

    async function getImages(){
        try {
            const response = await instance.get()
            setImages(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    const listData = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'https://ant.design',
            title: `ant design part ${i}`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
   
    return (
        <div>
            <Row>
            <Col xs={24} md={{ span: 20, offset: 2 }}>              
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15],
                    defaultPageSize: '4',
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}                        
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
            </Col>
          </Row>            
            
        </div>
    )
}

export default Album
