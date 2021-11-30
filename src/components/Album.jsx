import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Input, Modal, Typography, notification } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { instance } from '../services/instance';
import { secondInstance } from '../services/secondInstance';

const Album = () => {

    const [images, setImages] = useState([])
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [author,setAuthor] = useState('')
    const [post, setPost] = useState('')
    const avatar = 'https://joeschmoe.io/api/v1/random'
    console.log(images)
    console.log(post)

    useEffect(() => {
        getImages()
    }, [])

    async function getImages() {
        try {            
            const response = await instance.get()
            setImages(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }

    async function createPost() {
        try {            
            const response = await secondInstance.post(`/posts`,{
               title:post
            })
            createNotificationSuccess()
        } catch (e) {
            createNotificationError(e)
        }
        finally {
            setPost('')
            setVisible(false)
            setConfirmLoading(false)
        }
    }

    const createNotificationError = (message) => {
        notification.open({
            message: 'Произошла ошибка',
            description:
                `${message}`,
            icon: <FrownOutlined style={{ color: '#29625f' }} />,
        })
    }

    const createNotificationSuccess = () => {
        notification.open({
            message: 'Пост успешно добавлен!',
            icon: <SmileOutlined style={{ color: '#29625f' }} />,
        })
    }

    const onImageClick = (author) => {
        setVisible(true)
        setAuthor(author)
        setImages(images.filter(item => item.author != author))
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <div>
            <Row>
                <Col xs={24} md={{ span: 20, offset: 2 }}>
                    <div style={{ backgroundColor: '#29625f', marginTop: '20px' }} >
                        <Typography.Title style={{ color: 'white' }} level={3}>Галерея пользователей</Typography.Title>
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
                                    <img onClick = {() => onImageClick(item.author)}
                                        width={250}
                                        alt="logo"
                                        src={item.url}
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

            <Modal
                visible={visible}
                setVisible={setVisible}
                title={author}
                onOk={createPost}
                confirmLoading={confirmLoading}
                okText={'Создать пост'}
                cancelText={'Отмена'}
                onCancel={handleCancel}
                width={350}
            >
                <div>
                    <Input placeholder="Введите текст" value={post} onChange={event => setPost(event.target.value)} />
                </div>
            </Modal>

        </div>
    )
}

export default Album