import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { GetClaimsType ,AddClaimsType} from '@/intenties/claimTypesData'
import { getClaimsApi } from '@/api/claim'


export interface ClaimState {
    GetClaims: GetClaimsType[];
    AddClaims: AddClaimsType;
    Position: number;
}

@Module({ dynamic: true, store, name: 'claim' })
class Claim extends VuexModule implements ClaimState {
    public GetClaims: GetClaimsType[] = [];
    public Position= -1;

    public AddClaims: AddClaimsType = {
        name: "",
        description: "",
        required: true,
        valueType: "",
        rule: "",
        ruleValidationFailureDescription: "",
        userEditable: true
    }

    @Mutation
    private GET_CLAIMS(e: GetClaimsType[]) {
        this.GetClaims = e;
    }

    @Action
    public async getClaims(e: string) {
        const data = await getClaimsApi(e);
        this.GET_CLAIMS(data);
    }

    @Mutation
    private RESET_ADD_CLAIMS(){
        this.AddClaims = {
            name: "",
            description: "",
            required: true,
            valueType: "",
            rule: "",
            ruleValidationFailureDescription: "",
            userEditable: true
        }
    }
    @Action
    public resetAddClaims(){
        this.RESET_ADD_CLAIMS();
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

export const ClaimsModule = getModule(Claim)