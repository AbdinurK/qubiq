import { call, put, takeEvery } from 'redux-saga/effects'
import * as dealTypes from './types'
import { getDealsSuccess, getDealsFail } from './actions'
import { getDeals } from '../../api/deals'

function* fetchDeals() {
    try {
        const deals = yield call(getDeals)
        yield put(getDealsSuccess(deals))
    } catch (error) {
        yield put(getDealsFail(error))
    }
}


function* dealsSaga() {
    yield takeEvery(dealTypes.GET_DEALS, fetchDeals)
}

export default dealsSaga
