import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Input, Button, Modal, Typography } from 'antd';
import { instance } from '../services/instance';

const Album = () => {
    
    const[images,setImages] = useState([])
    const avatar = 'https://joeschmoe.io/api/v1/random'
    console.log(images)

    useEffect(() => {
        getImages()
    },[])

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
            <div style={{ backgroundColor: '#29625f', marginTop:'20px' }} >
            <Typography.Title style={{ color:'white' }} level={3}>Галерея пользователей</Typography.Title> 
            </div>             
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15],
                    defaultPageSize: '5',
                }}

                dataSource={images}
                
                renderItem={item => (
                    <List.Item
                        key={item.id}                        
                        extra={                            
                            <img
                                width={400}
                                alt="logo"                         
                                src= {item.url}                                
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={avatar} />}
                            title={item.id}
                            description={`Загрузить картинку можно по адресу: ${item.download_url}`}
                        />
                        {item.author}
                    </List.Item>
                )}
            />
            </Col>
          </Row>            
            
        </div>
    )
}

export default Album
