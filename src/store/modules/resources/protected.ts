import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import {getProtectedResourcesDataType} from '@/intenties/ResourcesType'
import {getProtectedResources} from '@/api/protectedResorces'


export interface ProtectedState {
    GetProtected: getProtectedResourcesDataType[];
    Position: number;
}

@Module({ dynamic: true, store, name: 'ide' })
class ProtectedResources extends VuexModule implements ProtectedState {
    GetProtected: getProtectedResourcesDataType[]=[];
    public Position=-1;

    @Mutation
    private GET_PROTECTED(e: getProtectedResourcesDataType[]){
        this.GetProtected=e;
    }

    @Action
    public async getProtected(){
        const data =await getProtectedResources('');
        this.GET_PROTECTED(data);
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

export const ProtectedModule = getModule(ProtectedResources)