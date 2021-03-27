import http from './base-api-service';

export const login = (email, password) => {
  return http.post('/login', { email, password })
}

export const register = (user) => {
  return http.post('/users', user)
}

export const logout = () => http.post('/logout')
