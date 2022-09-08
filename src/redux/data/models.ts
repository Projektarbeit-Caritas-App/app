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

export type Card = {
    "id": number,
    "last_name": string,
    "first_name": string,
    "street": string,
    "postcode": string,
    "city": string,
    "valid_from": string,
    "valid_until": string,
    "creator_id": number,
    "comment": string,
    "created_at": string,
    "updated_at": string
}

export type Person = {
    "id": number,
    "gender": string,
    "age": number,
    "data"?: LimitationState[]
    "created_at": string,
    "updated_at": string,
    "limitation_states": LimitationState[]
}

export type LimitationState = {
    "product_type": {
        "id": number,
        "name": string,
        "icon": string
    },
    "limit": number,
    "used": number,
    "person_id"?: number,
    "product_type_id"?: number,
    "amount"?: number
}


export type UserState = {
    user: User,
    token: string
}

export type LineItem = {
    person_id: number,
    product_type_id: number,
    amount: number,
}

export type CartView = {
    "card": Card,
    "persons": Person[]|[]
}
