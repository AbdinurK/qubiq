import * as dealActions from './types'


export const getDealsAction = () => ({
    type: dealActions.GET_DEALS
})

export const getDealsSuccess = deals => ({
    type: dealActions.GET_DEALS_SUCCESS,
    payload: deals,
})

export const getDealsFail = error => ({
    type: dealActions.GET_DEALS_FAILURE,
    payload: error,
})
