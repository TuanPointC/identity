import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import {ClientDataType} from '@/intenties/clientTypeData'
import {getClientApi} from '@/api/client'


export interface ClientState {
    GetClient: ClientDataType[];
}

@Module({ dynamic: true, store, name: 'client' })
class Client extends VuexModule implements ClientState {
  public GetClient: ClientDataType[]=[];

  @Mutation
  private GET_CLIENT(e: ClientDataType[]) {
      this.GetClient = e;
  }

  @Action
  public async getClient(e: string) {
      const data = await getClientApi(e);
      this.GET_CLIENT(data);
  }

}

export const ClientModule = getModule(Client)