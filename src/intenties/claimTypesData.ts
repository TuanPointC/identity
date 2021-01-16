export class GetClaimsType{
    id!: string;
    name!: string;
    description!: string;
    required!: boolean;
    reserved!: boolean;
    valueType!: string;
    rule!: string;
    ruleValidationFailureDescription!: string;
    userEditable!: boolean;
}

export class AddClaimsType{
    name!: string;
    description!: string;
    required!: boolean;
    valueType!: string;
    rule!: string;
    ruleValidationFailureDescription!: string;
    userEditable!: boolean;
}