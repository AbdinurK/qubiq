import {
    GET_DEALS,
    GET_DEALS_LOADING
} from "./types";
import axios from "axios";
import { transformation} from '../../helpers/transformation'

export const getDeals = () => dispatch => {
    dispatch(setDealsLoading());
    axios
        .get('http://localhost:8000/api/deals/')
        .then(res =>
            dispatch({
                type: GET_DEALS,
                payload: transformation(res.data)
            })
        )
};

export const setDealsLoading = () => {
    return {
        type: GET_DEALS_LOADING
    }
};

