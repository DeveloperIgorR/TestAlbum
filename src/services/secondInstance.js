import * as axios from 'axios'

export const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'

export const secondInstance = axios.create({      
    baseURL: SERVER_URL     
})