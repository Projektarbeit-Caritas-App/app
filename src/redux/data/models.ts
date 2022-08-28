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
    token: string
}

export type LineItem = {
    person_id: string,
    product_type_id: string,
    amount: number,
    personInfos: string, //following not required for api
    data: {
        name: string,
        icon: string,
        used: number,
        limit: number
    }
}