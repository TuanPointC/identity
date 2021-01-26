import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getIdentityResourcesDataType } from '@/intenties/ResourcesType'
import { getIdentityResources } from '@/api/identityResources'


export interface IdentityState {
    GetIdentity: getIdentityResourcesDataType[];
    Position: number;
}

@Module({ dynamic: true, store, name: 'ide' })
class IdentityResources extends VuexModule implements IdentityState {
    public GetIdentity: getIdentityResourcesDataType[] = [];
    public Position = -1;

    @Mutation
    private GET_IDENTITY(e: getIdentityResourcesDataType[]) {
        this.GetIdentity = e;
    }

    @Action
    public async getIdentity() {
        const data = await getIdentityResources('');
        this.GET_IDENTITY(data);
    }

    @Mutation
    private CHANGE_POSITION(e: number){
        this.Position=e;
    }
    @Action
    public changePosition(e: number){
        this.CHANGE_POSITION(e);
    }
}

export const IdentityModule = getModule(IdentityResources)