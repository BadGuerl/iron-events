const createError = require('http-errors');
const Event = require('../models/event.model');

module.exports.list = (req, res, next) => {
  const criteria = {}

  if (req.query.tag) {
    criteria.tags = req.query.tag
  }

  Event.find(criteria)
    .populate('owner', '_id name email')
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
  req.body.owner = req.user.id;

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
  // Event.findById(req.params. id)
  Event.findByIdAndDelete(req.params.id)
    .then(event => {
      if (event) res.status(204).json({})
      else next(createError(404, 'Event not found'))
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
  
  Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then(event => {
      if (event) res.json(event)
      else next(createError(404, 'Event not found'))
    })
    .catch(next)
}
