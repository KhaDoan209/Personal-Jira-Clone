export type FormLoginModel = {
    email: string,
    password: string
}

export type SignedInAccountModel = {
    id: number | null,
    email: string | null,
    avatar: string | null,
    phoneNumber: string | null,
    name: string | null,
    accessToken: string | null,
}