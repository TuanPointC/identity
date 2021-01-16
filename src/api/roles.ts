import axios from 'axios'
import { RolesModule } from '@/store/modules/roles'
const URL = 'http://10.20.99.4:5000/Roles'
import { GetUserRolesResultsType } from '@/intenties/rolesTypeData'

export const getRoles = () => {
    const data =
        axios.request<
            {
                id: string;
                name: string;
                description: string;
                reserved: boolean;

            }[]
        >({
            method: 'get',
            url: URL,
        })
            .then((response) => {
                return response.data;
            })
    return data;
}

export const addRoles = () => {
    axios({
        method: 'post',
        url: URL,
        data: RolesModule.AddRoles
    })
}

export const getUsersRoles = (param: {
    page: number;
    pageSize: number;
    q: string;
}) => {
    const data =
        axios.request<{
            results: GetUserRolesResultsType[];
            currentPage: number;
            pageCount: number;
            pageSize: number;
            totalCount: number;
            isSorted: boolean;
        }>({
            method: 'get',
            params: param,
            url: URL + '/' + RolesModule.GetRoles[RolesModule.Position].id + '/users'
        })
            .then((response) => {
                return response.data;
            })
    return data;
}

export const deleteRoles = () => {
    axios({
        method: 'delete',
        url: URL + '/' + RolesModule.GetRoles[RolesModule.Position].id
    })
}
export const edituseraRolesApi = (data: {
    id: string;
    name: string;
    description: string;
    reserved: boolean;
}) => {
    axios({
        method: 'put',
        url: URL + '/' + RolesModule.GetRoles[RolesModule.Position].id + '/users',
        data: data
    })
}

export const deleteUserRoles=(subject: string, data: string[])=>{
    axios({
        method:'delete',
        url:'http://10.20.99.4:5000/Users/'+subject+'/roles',
        data:data
    })
}

export const editRolesApi=()=>{
    axios({
        method:'put',
        url:URL+'/'+RolesModule.GetRoles[RolesModule.Position].id,
        data:{
            id:RolesModule.GetRoles[RolesModule.Position].id,
            name: RolesModule.GetRoles[RolesModule.Position].name,
            description:RolesModule.GetRoles[RolesModule.Position].description,
            reserved: true
        }
    })
}
