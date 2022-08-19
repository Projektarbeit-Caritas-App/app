export const initialUserData: User = {
    id: 1,
    name: 'Example User',
    email: 'example@localhost.test',
    instance: {
        id: 1,
        name: 'Example Instance',
        street: 'Teststreet 123',
        postcode: '12345',
        city: 'Test',
        contact: 'example@localhost.test',
        created_at: '2022-08-02T11:59:43.000000Z',
        updated_at: '2022-08-02T11:59:43.000000Z'
    },
    organization: {
        id: 1,
        name: 'Example Organisation',
        street: 'Teststreet 123',
        postcode: '12345',
        city: 'Test',
        contact: 'example@localhost.test',
        created_at: '2022-08-02T11:59:44.000000Z',
        updated_at: '2022-08-02T11:59:44.000000Z'
    }
}

export const initialUserState: UserState = {
    user: initialUserData,
    loggedIn: false,
    loading: false,
    error: false
}





export type User = {
    id: number,
    name: string,
    email: string,
    instance: {
        id: number,
        name: string,
        street: string,
        postcode: string,
        city: string,
        contact: string,
        created_at: string,
        updated_at: string
    },
    organization: {
        id: number,
        name: string,
        street: string,
        postcode: string,
        city: string,
        contact: string,
        created_at: string,
        updated_at: string
    }
}

export type UserState = {
    user: User,
    loggedIn: boolean,
    loading: boolean,
    error: boolean
}
