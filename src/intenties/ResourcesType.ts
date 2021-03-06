export class getIdentityResourcesDataType {
    id!: string;
    name!: string;
    displayName!: string;
    description!: string;
    enabled!: boolean;
    required!: boolean;
    emphasize!: boolean;
    showInDiscoveryDocument!: boolean;
    allowedClaims!: string[];
    nonEditable!: boolean;
}

export class getProtectedResourcesDataType {
    id!: string;
    name!: string;
    displayName!: string;
    description!: string;
    enabled!: boolean;
    secrets!: {
        id: number;
        type: string;
        value: string,
        description: string,
        expiration: string
    }[];
    scopes!: {
        id: number,
        name: string,
        displayName: string,
        description: string,
        required: boolean,
        emphasize: boolean,
        showInDiscoveryDocument: boolean,
        userClaims: string[]
    }[];
    allowedClaims!: string[];
    created!: string;
    nonEditable!: boolean;
}

export class addProtectedResurcesDataType {
    name!: string;
    displayName!: string;
    description!: string;
    allowedClaims!: string[];
    resourceSecrets!: {
        type: string,
        value: string,
        description: string,
        expiration: string
    }[]
}