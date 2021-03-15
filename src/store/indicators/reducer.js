import * as indicatorTypes from './types'

const initialState = {
    indicators: [],
    indicator: {},
    loading: false,
    error: ''
}

const indicator = (state = initialState, action) => {
    switch (action.type) {
        case indicatorTypes.GET_INDICATORS_SUCCESS:
            return {
                ...state,
                indicators: action.payload
            }
        case indicatorTypes.GET_INDICATORS_ERROR:
            return {
                ...state,
                error: 'Can\'t fetch indicators!'
            }
        case indicatorTypes.GET_INDICATOR_SUCCESS:
            return {
                ...state,
                indicator: action.payload
            }
        case indicatorTypes.GET_INDICATOR_ERROR:
            return {
                ...state,
                error: 'Can\'t fetch indicator!'
            }
        default:
            return state
    }
}


export default indicator
