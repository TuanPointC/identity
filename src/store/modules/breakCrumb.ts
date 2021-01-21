import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface BreakCrumbState {
   Router: string;
}

@Module({ dynamic: true, store, name: 'breakCrumb' })
class BreakCrumb extends VuexModule implements BreakCrumbState {
    public Router= '';

    @Mutation
    private CHANGE_ROUTER(e: string){
        this.Router='/ '+e;
    }

    @Action
    public changeRouter(e: string){
        this.CHANGE_ROUTER(e);
    }
}

export const BreakCrumbModule = getModule(BreakCrumb)