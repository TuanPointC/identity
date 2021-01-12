import axios from 'axios'

const URL = 'http://192.168.11.212:5000/Roles'

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