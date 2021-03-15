import { combineReducers } from 'redux'

import Login from './login/reducer'
import Deals from './deals/reducer'
import Indicators from './indicators/reducer'


const rootReducer = combineReducers({
    Login,
    Deals,
    Indicators
})

export default rootReducer
