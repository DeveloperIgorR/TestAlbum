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
                    defaultPageSize: '5',
                }}
                dataSource={images}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.author}                        
                        extra={
                            console.log(item.url),
                            <img
                                width={272}                                
                                src= {item.url}                                
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
