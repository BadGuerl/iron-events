import http from './base-api-service';

<<<<<<< HEAD
export const login = (email, password) => {
  return http.post('/login', { email, password })
}

export const register = (user) => {
  return http.post('/users', user)
}
=======
export const login = (email, password) => http.post('/login', { email, password })

export const register = (user) => http.post('/users', user)
>>>>>>> 0558830182c8d49ddb364df98a938a7fc29d74c0

export const logout = () => http.post('/logout')
