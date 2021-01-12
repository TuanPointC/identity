import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getRoles } from '@/api/roles'

export interface RoleState {
    GetRoles: {
        id: string;
        name: string;
        description: string;
        reserved: boolean;

    }[];
}
@Module({ dynamic: true, store, name: 'role' })
class Role extends VuexModule implements RoleState {
    public GetRoles: {
        id: string;
        name: string;
        description: string;
        reserved: boolean;

    }[] = [];

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
}

export const RolesModule = getModule(Role)