export class ClientDataType {
    id!: string;
    enabled!: boolean;
    clientId!: string;
    description!: string;
    protocolType!: string;
    clientSecrets!: {
        id: number,
        type: string,
        value: string,
        description: string,
        expiration: string
    }[];
    requireClientSecret!: false;
    clientName!: string;
    clientUri!: string;
    logoUri!: string;
    requireConsent!: boolean;
    allowRememberConsent!: boolean;
    allowedGrantTypes!: string[];
    requirePkce!: boolean;
    allowPlainTextPkce!: boolean;
    allowAccessTokensViaBrowser!: boolean;
    redirectUris!: string[];
    postLogoutRedirectUris!: string[];
    frontChannelLogoutUri!: string;
    frontChannelLogoutSessionRequired!: boolean;
    allowOfflineAccess!: boolean;
    allowedScopes!: string[];
    alwaysIncludeUserClaimsInIdToken!: boolean;
    identityTokenLifetime!: number;
    accessTokenLifetime!: number;
    authorizationCodeLifetime!: number;
    absoluteRefreshTokenLifetime!: number;
    slidingRefreshTokenLifetime!: number;
    refreshTokenUsage!: string;
    updateAccessTokenClaimsOnRefresh!: boolean;
    refreshTokenExpiration!: string;
    accessTokenType!: string;
    enableLocalLogin!: true;
    identityProviderRestrictions!: string[];
    includeJwtId!: false;
    claims!: {
        type: string,
        value: string
    }[];
    alwaysSendClientClaims!: false;
    clientClaimsPrefix!: string;
    allowedCorsOrigins!: string[];
    properties!: string[];
    pairWiseSubjectSalt!: string;
    consentLifetime!: number;
    backChannelLogoutSessionRequired!: boolean;
    backChannelLogoutUri!: boolean;
    userSSOLifetime!: boolean;
    nonEditable!: boolean;
    deviceCodeLifetime!: number;
    userCodeType!: string;
    clientType!: string;
}

export class addClientDataType {
    clientType!: string;
    clientId!: string;
    clientName!: string;
    clientUri!: string;
    logoUri!: string;
    description!: string;
    requireConsent!: boolean;
    redirectUris!: string[];
    postLogoutRedirectUris!: string[];
    allowedScopes!: string[];
    allowedCorsOrigins!: string[];
    clientSecrets!: {
        type: string;
        value: string;
        description: string;
        expiration: string;
    }[]
}