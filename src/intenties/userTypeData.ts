export class GetUserResultsType {
    subject!: string;
    username!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    isBlocked!: boolean;
    lockoutEnd!: null;
    lockoutEnabled!: boolean;
    isDeleted!: boolean;
    roles!: [];
    claims!: []
}

export class RequestGetUserType {
    page!: number;
    pageSize!: number;
    sort!: string;
    username!: string;
    email!: string;
    name!: string;
    id!: string;
    state!: string;
    q!: string;
}

export class AddUserType {
    username!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    roles!: {
        id: string,
        name: string,
        description: string,
        reserved: boolean
    }[];
    claims!: {
        type: string,
        value: string
    }[];
}

