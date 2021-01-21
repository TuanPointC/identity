import axios from 'axios'
import { ClientDataType } from '@/intenties/clientTypeData'
const URL = 'http://192.168.11.212:5000/Clients'

import {addClientDataType} from '@/intenties/clientTypeData'

export const getClientApi = (params: string) => {
    const data =
        axios.request<
            ClientDataType[]
        >({
            method: 'get',
            url: URL,
            params: { name: params }
        })
            .then((response) => {
                return response.data;
            })
    return data;
}

export const addClientApi = (data: addClientDataType)=>{
    axios({
        method:'post',
        url: URL,
        data: data
    })
}

