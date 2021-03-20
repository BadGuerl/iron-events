import http from './base-api-service';

export const login = (email, password) => http.post('/login', { email, password })

export const logout = () => http.post('/logout')