import { get } from './api_helper'

export const getDeals = () => get('http://localhost:8000/api/deals/')
