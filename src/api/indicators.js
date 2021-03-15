import { get } from './api_helper'

export const getIndicators = () => get('http://localhost:8000/api/indicators/')
export const getIndicator = (id) => get(`http://localhost:8000/api/indicators/${id}`)
