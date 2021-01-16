import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { GetUserResultsType, RequestGetUserType, AddUserType } from '@/intenties/userTypeData'
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
    EditPosition: number;
    RequestGetUser: RequestGetUserType;
    AddUser: AddUserType;
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements UserState {
    public GetUser = {
        results: [] as GetUserResultsType[] ,
        currentPage: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
        isSorted: true,
    };
    public EditPosition= -1;
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

    public AddUser: AddUserType = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: [],
        claims: [] as {
            type: string;
            value: string;
        }[],
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

    @Mutation 
    private CHANGE_EDIT_POSITION(e: number){
        this.EditPosition=e;
    }
    @Action
    public async changeEditPosition(e: number){
        await this.CHANGE_EDIT_POSITION(e);
    }

    @Mutation
    private CHANGE_ACTIVE(e: boolean){
        this.GetUser.results[this.EditPosition].isDeleted=e;
        this.GetUser.results[this.EditPosition].isBlocked=e;
    }
    @Action
    private changeActive(e: boolean){
        this.CHANGE_ACTIVE(e);
    }
}

export const UserModule = getModule(User)