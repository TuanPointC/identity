import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { GetUserResultsType, RequestGetUserType } from '@/intenties/userTypeData'
import { getUsers } from '@/api/user'

export interface UserState {
    GetUser: {
        results: GetUserResultsType[];
        currentPage: number;
        pageCount: number;
        pageSize: number;
        totalCount: number;
        isSorted: boolean;

    };
    RequestGetUser: RequestGetUserType;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
    public GetUser = {
        results: [] as GetUserResultsType[],
        currentPage: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
        isSorted: true,
    };
    public RequestGetUser = {
        page: 1,
        pageSize: 5,
        sort: '',
        username: '',
        email: '',
        name: '',
        id: '',
        state: '',
        q: '',
    }

    @Mutation
    private GET_USER_API(userData: {
        results: GetUserResultsType[];
        currentPage: number;
        pageCount: number;
        pageSize: number;
        totalCount: number;
        isSorted: boolean;

    }) {
        this.GetUser = userData;
    }

    @Action
    public async getuserapi() {
        const data = await getUsers(this.RequestGetUser);
        this.GET_USER_API(data);
    }
}

export const UserModule = getModule(User)