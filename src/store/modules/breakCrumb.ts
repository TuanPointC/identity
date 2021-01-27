import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface BreakCrumbState {
    Router: string;
    BorderValueResources: string;
    Color: string;
}

@Module({ dynamic: true, store, name: 'breakCrumb' })
class BreakCrumb extends VuexModule implements BreakCrumbState {
    public Router = '';
    public BorderValueResources = "";
    public Color = '#aeaeae';

    @Mutation
    private CHANGE_ROUTER(e: string) {
        this.Router = '/ ' + e;
    }

    @Action
    public changeRouter(e: string) {
        this.CHANGE_ROUTER(e);
    }

    @Mutation
    private CHANGE_BORDER(e: string) {
        this.BorderValueResources = e;
        if (e == '4px solid orangered') {
            this.Color = 'white';
        }
        else{
            this.Color='#aeaeae';
        }
    }

    @Action
    public changeBorder(e: string) {
        this.CHANGE_BORDER(e);
    }
}

export const BreakCrumbModule = getModule(BreakCrumb)