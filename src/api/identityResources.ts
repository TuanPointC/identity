import axios from 'axios'
const URL = 'http://192.168.11.212:5000/IdentityResources'
import { getIdentityResourcesDataType, getProtectResourcesDataType } from '@/intenties/identityResources'


export const getIdentityResources = (param: string) => {
    const data =
        axios.request<getIdentityResourcesDataType[]
        >({
            method: 'get',
            url: URL,
            params: param
        })
            .then((response) => {
                return response.data;
            })
    return data;
}
export const getProtectResources = (param: string) => {
    const data =
        axios.request<getProtectResourcesDataType[]
        >({
            method: 'get',
            url: URL,
            params: param
        })
            .then((response) => {
                return response.data;
            })
    return data;
}