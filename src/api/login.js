import { post } from './api_helper'

export const postJwtLogin = data => post('http://localhost:8000/api/token/', data)
