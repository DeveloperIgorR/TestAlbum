import * as axios from 'axios'

export const SERVER_URL = 'https://picsum.photos/v2/list?page=2&limit=100'

export const instance = axios.create({      
    baseURL: SERVER_URL     
})
