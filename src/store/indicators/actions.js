import * as indicatorTypes from './types'


export const getIndicators = () => ({
    type: indicatorTypes.GET_INDICATORS
})

export const getIndicatorsSuccess = indicators => ({
    type: indicatorTypes.GET_INDICATORS_SUCCESS,
    payload: indicators
})

export const getIndicatorsFailure = error => ({
    type: indicatorTypes.GET_INDICATORS_ERROR,
    error
})


export const getIndicator = indicatorId => ({
    type: indicatorTypes.GET_INDICATOR,
    indicatorId
})

export const getIndicatorSuccess = indicator => ({
    type: indicatorTypes.GET_INDICATOR_SUCCESS,
    payload: indicator
})

export const getIndicatorFailure = error => ({
    type: indicatorTypes.GET_INDICATOR_ERROR,
    error
})


