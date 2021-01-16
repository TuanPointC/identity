import axios from 'axios'
import { GetClaimsType } from '@/intenties/claimTypesData'
import { ClaimsModule } from '@/store/modules/claim'
const URL = 'http://10.20.99.4:5000/ClaimTypes'



export const getClaimsApi = ( params: string) => {
    const data =
        axios.request<
            GetClaimsType[]
        >({
            method: 'get',
            url: URL,
            params:{name: params}
        })
            .then((response) => {
                return response.data;
            })
    return data;
}

export const addClaimsApi=()=>{
    axios({
        method:'post',
        url:URL,
        data: ClaimsModule.AddClaims,
    })
}

export const editClaimApi=()=>{
    axios({
        method:'put',
        url:URL+'/'+ClaimsModule.GetClaims[ClaimsModule.Position].id,
        data: ClaimsModule.GetClaims[ClaimsModule.Position],
    })
}
export const deleteClaimApi=()=>{
    axios({
        method:'delete',
        url:URL+'/'+ClaimsModule.GetClaims[ClaimsModule.Position].id,
    })
}