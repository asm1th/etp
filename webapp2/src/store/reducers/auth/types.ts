
export interface AuthState {
    isAuth: boolean
}

export enum AuthActionsEnum{
    SET_AUTH = "SET_AUTH"
}

export interface SetAuthState {
    type: AuthActionsEnum.SET_AUTH;
    payload: boolean;
}

export type AuthAction = 
    SetAuthState