import { RequestGetUserType, GetUserResultsType } from '@/intenties/userTypeData'
import axios from 'axios'

const URL = 'http://192.168.11.212:5000/Users'

export const getUsers = (param: RequestGetUserType) => {
  const data=
  axios.request<{
    results: GetUserResultsType[];
    currentPage: number;
    pageCount: number;
    pageSize: number;
    totalCount: number;
    isSorted: boolean;

  }>({
    method: 'get',
    url: URL+'/lightweight',
    params: param
  })
  .then((response) => {
      return response.data;
    })
  return data;
}