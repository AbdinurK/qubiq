import * as loginActions from './types'


export const loginUserAction = (user, history) => {
    return {
        type: loginActions.LOGIN_USER,
        payload: { user, history },
    }
}

export const loginSuccess = user => {
    return {
        type: loginActions.LOGIN_SUCCESS,
        payload: user,
    }
}

export const apiError = error => {
    return {
        type: loginActions.API_ERROR,
        payload: error,
    }
}
