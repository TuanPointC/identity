import { RequestGetUserType, GetUserResultsType } from '@/intenties/userTypeData'
import axios from 'axios'
import { UserModule } from '@/store/modules/user'

const URL = 'http://192.168.11.212:5000/Users'

export const getUsers = (param: RequestGetUserType) => {
  const data =
    axios.request<{
      results: GetUserResultsType[];
      currentPage: number;
      pageCount: number;
      pageSize: number;
      totalCount: number;
      isSorted: boolean;
    }>({
      method: 'get',
      url: URL,
      params: param
    })
      .then((response) => {
        return response.data;
      })
  return data;
}

export const addUserApi = () => {
  axios({
    method: 'post',
    url: URL,
    data: UserModule.AddUser
  })
}

export const editUserApi = () => {
  axios({
    method: 'put',
    url: URL + '/' + UserModule.GetUser.results[UserModule.EditPosition].subject,
    data: UserModule.GetUser.results[UserModule.EditPosition],
  })
}
export const deleteUserApi = () => {
  axios({
    method: 'delete',
    url: URL + '/' + UserModule.GetUser.results[UserModule.EditPosition].subject,
  })
}

export const addRolesApi = (data: string[]) => {
  axios({
    method: 'post',
    url: URL + '/' + UserModule.GetUser.results[UserModule.EditPosition].subject + '/roles',
    data: data
  })
}

export const deleteRolesApi = (data: string[]) => {
  axios({
    method: 'delete',
    url: URL + '/' + UserModule.GetUser.results[UserModule.EditPosition].subject + '/roles',
    data: data
  })
}