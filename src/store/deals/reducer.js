import * as dealActions from './types'
import { transformation } from '../../helpers/transformation'

const initialState = {
    deals: [],
    deal: {},
    error: {}
}


const dealsStore = (state = initialState, action) => {
    switch (action.type) {
        case dealActions.GET_DEALS_SUCCESS:
            return {
                ...state,
                deals: transformation(action.payload)
            }
        case dealActions.GET_DEALS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}


export default dealsStore
