import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getRoles, addRoles,getUsersRoles } from '@/api/roles'
import {GetUserRolesResultsType} from '@/intenties/rolesTypeData'

export interface RoleState {
    GetRoles: {
        id: string;
        name: string;
        description: string;
        reserved: boolean;

    }[];

    AddRoles: {
        name: string;
        description: string;
    };

    Position: number;

    GetUserRoles: {
        results: GetUserRolesResultsType[];
        currentPage: number;
        pageCount: number;
        pageSize: number;
        totalCount: number;
        isSorted: boolean;
    };

    GetUserRolesPageSize: {
        page: number;
        pageSize: number;
        q: string;
    };
}
@Module({ dynamic: true, store, name: 'role' })
class Role extends VuexModule implements RoleState {
    public GetRoles: {
        id: string;
        name: string;
        description: string;
        reserved: boolean;

    }[] = [];

    public AddRoles = {
        name: '',
        description: ''
    }

    public Position = -1;

    public GetUserRoles = {
        results: [] as GetUserRolesResultsType[],
        currentPage: 0,
        pageCount: 0,
        pageSize: 0,
        totalCount: 0,
        isSorted: true,
    };

    public GetUserRolesPageSize={
        page: 1,
        pageSize:5,
        q: ''
    }

    @Mutation
    private GET_ROLES_API(e: {
        id: string;
        name: string;
        description: string;
        reserved: boolean;

    }[]) {
        this.GetRoles = e;
    }

    @Action
    public async getRolesApi() {
        const data = await getRoles();
        this.GET_ROLES_API(data);
    }

    @Mutation
    private ADD_ROLES(e: {
        name: string;
        description: string;
    }) {
        this.AddRoles = e;
    }
    @Action
    async addRoles(e: {
        name: string;
        description: string;
    }) {
        await this.ADD_ROLES(e);
        addRoles();
    }

    @Mutation
    private CHANGE_POSITION(e: number) {
        this.Position = e;
    }
    @Action
    public changePosition(e: number) {
        this.CHANGE_POSITION(e);
    }

    @Mutation
    private GET_USERS_ROLES_API(e: {
        results: GetUserRolesResultsType[];
        currentPage: number;
        pageCount: number;
        pageSize: number;
        totalCount: number;
        isSorted: boolean;
    }){
        this.GetUserRoles=e;
      
    }

    @Action
    public async getUsersRolesApi(){
        const data= await getUsersRoles(this.GetUserRolesPageSize);
        this.GET_USERS_ROLES_API(data);
    }


}

export const RolesModule = getModule(Role)