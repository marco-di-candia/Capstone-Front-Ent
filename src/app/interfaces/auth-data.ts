export interface AuthData {
    token : string,
    user: {
        id: number,
        username: string,
        name: string,
        surname: string,
        email: string,
        pictureProfile: string | null,
        role: string,
        enabled: boolean,
        authorities: [
            {
                authority: string
            }
        ],
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        accountNonLocked: boolean
    }
}
