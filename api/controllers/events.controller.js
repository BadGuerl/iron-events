const createError = require('http-errors');
const Event = require('../models/event.model');

module.exports.list = (req, res, next) => {
  const criteria = {}

  if (req.query.tag) {
    criteria.tags = req.query.tag
  }

  Event.find(criteria)
    .populate('owner', '_id name')
    .then(events => res.json(events))
    .catch(next)
}

module.exports.get = (req, res, next) => {
  Event.findById(req.params.id)
    .populate('owner', '_id name email') // id no es necesario traerlo
    .then(event => {
      if (event) res.json(event)
      else next(createError(404, 'Event not found'))
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const { location } = req.body;
  req.body.location = {
    type: 'Point',
    coordinates: location
  }
  req.body.owner = req.user.id; // este es el usuario que esta logueado en este momento

  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(error => {
      if (error.errors && error.errors['location.coordinates']) {
        error.errors.location = error.errors['location.coordinates'];
        delete error.errors['location.coordinates'];
      }
      next(error);
    })
}

module.exports.delete = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (!event) next(createError(404, 'Event not found'))
      else if (event.owner != req.user.id/* && req.user.role !== 'admin'*/) next(createError(403, 'Not allowed')) // el admin puede borrar
      else return event.delete()
        .then(() => res.status(204).json({}))
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { location } = req.body;
  if (location) {
    req.body.location = {
      type: 'Point',
      coordinates: location
    }
  }
  delete req.body.owner;
  
  Event.findById(req.params.id)
  .then(event => {
    if (!event) next(createError(404, 'Event not found'))
    else if (event.owner != req.user.id/* && req.user.role !== 'admin'*/) next(createError(403, 'Not allowed')) // el admin puede actualizar
    else {
      Object.assign(event, req.body)  // aqui le pasas todas las propiedades que han cambiado
      return event.save()  // aqui se guardan
      .then(event => res.json(event))
    }
  })
  .catch(next);
}
