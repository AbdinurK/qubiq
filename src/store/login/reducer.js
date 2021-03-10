import * as loginActions from './types'


const initialState = {
    error: "",
    user: {},
    loading: false,
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case loginActions.LOGIN_USER:
            state = {
                ...state,
                loading: true,
            }
            break
        case loginActions.LOGIN_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break
        case loginActions.API_ERROR:
            state = { ...state, error: action.payload, loading: false }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default login
