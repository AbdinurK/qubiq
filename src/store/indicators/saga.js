import { call, put, takeEvery } from 'redux-saga/effects'
import {
    getIndicatorsSuccess,
    getIndicatorSuccess,
    getIndicatorFailure,
    getIndicatorsFailure
} from './actions'
import * as indicatorTypes from './types'
import { getIndicators, getIndicator } from '../../api/indicators'

function* fetchIndicators() {
    try {
        const indicators = yield call(getIndicators)
        yield put(getIndicatorsSuccess(indicators))
    } catch (error) {
        yield put(getIndicatorsFailure(error))
    }
}

function* fetchIndicator({ indicatorId }) {
    try {
        const indicator = yield call(getIndicator, indicatorId)
        yield put(getIndicatorSuccess(indicator))
    } catch (error) {
        yield put(getIndicatorFailure(error))
    }
}


function* indicatorsSaga() {
    yield takeEvery(indicatorTypes.GET_INDICATORS, fetchIndicators)
    yield takeEvery(indicatorTypes.GET_INDICATOR, fetchIndicator)
}

export default indicatorsSaga
