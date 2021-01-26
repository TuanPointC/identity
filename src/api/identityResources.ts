import axios from 'axios'
const URL = 'http://192.168.11.245:5000/IdentityResources'
import { getIdentityResourcesDataType } from '@/intenties/ResourcesType'
import { IdentityModule } from '@/store/modules/resources/identity'


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

export const addIdentityResourcesApi = (data: {
    name: string;
    displayName: string;
    description: string;
    allowedClaims: string[];
}) => {
    axios({
        method: 'post',
        url: URL,
        data: data
    })
}


export const editIdentityResourceApi = (data: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    enabled: boolean;
    required: boolean;
    emphasize: boolean;
    showInDiscoveryDocument: boolean;
    allowedClaims: string[];
    nonEditable: boolean;
}) => {
    axios({
        method: 'put',
        url: URL + '/' + IdentityModule.GetIdentity[IdentityModule.Position].id,
        data: data
    })
}

export const deleteIdentityResourceApi=()=>{
    axios({
        method:'delete',
        url: URL + '/' + IdentityModule.GetIdentity[IdentityModule.Position].id,
    })
}