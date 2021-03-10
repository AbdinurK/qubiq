import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const API_URL = ""

const axiosApi = axios.create({
    baseURL: API_URL,

})


axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

export async function post(url, data, config = {}) {
    return axiosApi
        .post(url, { ...data }, { ...config })
        .then(response => response.data)
}

export async function get(url, config = {}) {
    return await axiosApi.get(url, { ...config }).then(response => response.data)
}
