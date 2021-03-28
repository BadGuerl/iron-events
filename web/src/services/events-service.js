import http from './base-api-service';

const list = () => http.get('/events')

const get = (id) => http.get(`/events/${id}`)
  // .then(event => {   esta promesa hace que no se ejecute el get events hasta dentro de 5 segundos
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(event), 5000)
  //   })
  // })

const create = (event) => http.post(`/events`, event)

const remove = (id) => http.delete(`/events/${id}`)

const update = (event) => http.put(`/events`, event)

const service = {
  create,
  update,
  remove,
  list,
  get
}

export default service;
