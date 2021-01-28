import axios from 'axios'
import { ClientDataType } from '@/intenties/clientTypeData'
import { ClientModule } from '@/store/modules/client'
const URL = 'http://192.168.11.212:5000/Clients'

import { addClientDataType } from '@/intenties/clientTypeData'

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

export const addClientApi = (data: addClientDataType) => {
    axios({
        method: 'post',
        url: URL,
        data: data
    })
}

export const deleteClientApi = () => {
    axios({
        method: 'delete',
        url: URL + '/' + ClientModule.GetClient[ClientModule.Position].id,
    })
}

export const addClientApiSecret = (data: {
    type: string;
    value: number;
    description: string;
    expiration: string;
}) => {
    axios({
        method: 'post',
        url: URL + '/' + ClientModule.GetClient[ClientModule.Position].id+'/secrets',
        data: data
    })
}

export const deleteClientSecretApi = (index: number) => {
    axios({
        method: 'delete',
        url: URL + '/' + ClientModule.GetClient[ClientModule.Position].id+'/secrets/'+ClientModule.GetClient[ClientModule.Position].clientSecrets[index].id,
    })
}


