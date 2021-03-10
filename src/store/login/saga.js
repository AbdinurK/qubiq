import { takeEvery, put, call } from 'redux-saga/effects'
import * as loginTypes from './types'
import { loginSuccess, apiError } from './actions'
import { postJwtLogin } from '../../api/login'


function* loginUser({ payload: { user, history } }) {
    try {
        const response = yield call(postJwtLogin, {
            email: user.email,
            password: user.password,
        })
        localStorage.setItem("qubiq", JSON.stringify(response))
        yield put(loginSuccess(response))
        history.push("/dashboard")
    } catch (error) {
        yield put(apiError(error))
    }
}

function* authSaga() {
    yield takeEvery(loginTypes.LOGIN_USER, loginUser)
}

export default authSaga
