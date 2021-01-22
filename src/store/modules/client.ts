import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import {ClientDataType} from '@/intenties/clientTypeData'
import {getClientApi} from '@/api/client'


export interface ClientState {
    GetClient: ClientDataType[];
    Position: number;
}

@Module({ dynamic: true, store, name: 'client' })
class Client extends VuexModule implements ClientState {
  public GetClient: ClientDataType[]=[];
  public Position= -1;

  @Mutation
  private GET_CLIENT(e: ClientDataType[]) {
      this.GetClient = e;
  }

  @Action
  public async getClient(e: string) {
      const data = await getClientApi(e);
      this.GET_CLIENT(data);
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

export const ClientModule = getModule(Client)