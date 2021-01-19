import {
    GET_DEALS,
    GET_DEALS_LOADING
} from "../action/types";

const initialState = {
    deals: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEALS:
            return {
                ...state,
                deals: action.payload,
                loading: false
            };
        case GET_DEALS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
