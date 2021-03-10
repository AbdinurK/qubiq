import { combineReducers } from 'redux'

import Login from './login/reducer'
import Deals from './deals/reducer'


const rootReducer = combineReducers({
    Login,
    Deals
})

export default rootReducer
