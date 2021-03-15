import { all, fork } from 'redux-saga/effects'
import AuthSaga from './login/saga'
import DealSaga from './deals/saga'
import IndicatorSaga from './indicators/saga'


export default function* rootSaga() {
    yield all([
        fork(AuthSaga),
        fork(DealSaga),
        fork(IndicatorSaga),
    ])
}
