import axios from 'axios'
const URL = 'http://192.168.11.245:5000/ProtectedResources'
import { getProtectedResourcesDataType, addProtectedResurcesDataType } from '@/intenties/ResourcesType'
import { ProtectedModule } from '@/store/modules/resources/protected'


export const getProtectedResources = (param: string) => {
    const data =
        axios.request<getProtectedResourcesDataType[]
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

export const addProtectedResourcesApi = (data: addProtectedResurcesDataType) => {
    axios({
        method: 'post',
        url: URL,
        data: data
    })
}

export const editProtectedResourceApi = (data: getProtectedResourcesDataType) => {
    axios({
        method: 'put',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id,
        data: data
    })
}

export const deleteProtectedResourceApi = () => {
    axios({
        method: 'delete',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id,
    })
}

export const addProtectedResourceApi = (data: {
    name: string;
    displayName: string;
    description: string;
    allowedClaims: string[];
}) => {
    axios({
        method: 'post',
        url: URL,
        data:data
    })
}



export const addProtectedResourcesSecretsApi = (data: {
    type: string;
    value: string;
    description: string;
    expiration: string;
}) => {
    axios({
        method: 'post',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id + '/secrets',
        data: data
    })
}

export const deleteProtectedSecret = (e: number) => {
    axios({
        method: 'delete',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id + '/secrets/' + e,
    })
}

export const editScopes = (data: {
    id: number;
    name: string;
    displayName: string;
    description: string;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    userClaims: string[];
}) => {
    axios({
        method: 'put',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id + '/scopes/' + data.id,
        data: data
    })
}

export const addProtectedResourcesScopesApi = (data: {
    id: number;
    name: string;
    displayName: string;
    description: string;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    userClaims: string[];
}) => {
    axios({
        method: 'post',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id + '/scopes',
        data: data
    })
}

export const deleteScopes = (id: string) => {
    axios({
        method: 'delete',
        url: URL + '/' + ProtectedModule.GetProtected[ProtectedModule.Position].id + '/scopes/' + id,
    })
}