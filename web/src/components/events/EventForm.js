import { useState } from 'react';
import { Redirect } from 'react-router';
import eventsService from '../../services/events-service';

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = 'Title is required';
    } else if (value && value.length < 5) {
      message = 'Title needs at least 5 characters'
    }
    return message;
  },
  description: (value) => {
    let message;
    if (!value) {
      message = 'Description is required';
    } else if (value && value.length < 10) {
      message = 'Description needs at least 10 characters'
    }
    return message;
  },
  image: (value) => {
    let message;
    if (!value) {
      message = 'Image is required';
    }
    return message;
  },
  capacity: (value) => {
    let message;
    if (!value) {
      message = 'Capacity is required';
    } else if (value && Number(value) <= 0) {
      message = 'Capacity must be grater than 0';
    }
    return message;
  },
  start: (value) => {
    let message;
    if (!value) {
      message = 'Start date is required';
    }
    return message;
  },
  end: (value) => {
    let message;
    if (!value) {
      message = 'End date is required';
    }
    return message;
  },
  latitude: (value) => {
    let message;
    if (!value) {
      message = 'Latitude is required';
    } else if (Math.abs(Number(value)) > 90) {
      message = 'Latitude must be between -90 and 90';
    }
    return message;
  },
  longitude: (value) => {
    let message;
    if (!value) {
      message = 'Longitude is required';
    } else if (Math.abs(Number(value)) > 180) {
      message = 'Longitude must be between -180 and 180';
    }
    return message;
  },
}

function EventForm() {
  const [state, setState] = useState(
    {
      event: {
        title: '',
        description: '',
        image: '',
        capacity: '',
        start: '',
        end: '',
        latitude: '',
        longitude: '',
        tags: ''
      },
      errors: {
        title: validations.title(),
        description: validations.description(),
        image: validations.image(),
        capacity: validations.capacity(),
        start: validations.start(),
        end: validations.end(),
        latitude: validations.latitude(),
        longitude: validations.longitude()
      },
      touch: {},
      isCreated: false
    }
  )

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state, props) => {
      return {
        event: {
          ...state.event,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        }
      }
    });
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState((state, props) => ({
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid()) {

      const eventCreationData = state.event;
      eventCreationData.location = [eventCreationData.longitude, eventCreationData.latitude];
      eventCreationData.tags = eventCreationData?.tags.split(',').map(tag => tag.trim()) || [];

      eventsService.create(eventCreationData)
        .then(event => setState({ isCreated: true }))
        .catch(error => {
          const { message, errors } = error.response?.data || { message: error.message };

          if (errors?.location) {
            errors.latitude = errors.location;
            errors.longitude = errors.location;
            delete errors.location;
          }

          setState({
            errors: {
              ...errors,
              title: !errors && message
            },
            touch: {
              ...errors,
              title: !errors && message
            }
          })
        })
    }
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }
  const { event, errors, touch, isCreated } = state;

  if (isCreated) {
    return (<Redirect to="/" />)
  }

  return (
    <div className="row row-cols-1">
      <div className="col text-center mb-2">
        <img className="img-fluid img-thumbnail" src={event.image} alt={event.title} onError={(event) => event.target.src = 'https://via.placeholder.com/800x400'} />
      </div>
      <div className="col">
        <form onSubmit={handleSubmit}>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="title" className={`form-control ${(touch.title && errors.title) ? 'is-invalid' : ''}`} placeholder="Event title..."
              value={event.title} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.title}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-edit fa-fw"></i></span>
            <textarea name="description" className={`form-control ${(touch.description && errors.description) ? 'is-invalid' : ''}`} placeholder="Event description..."
              value={event.description} onBlur={handleBlur} onChange={handleChange}></textarea>
            <div className="invalid-feedback">{errors.description}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-users fa-fw"></i></span>
            <input type="number" name="capacity" className={`form-control ${(touch.capacity && errors.capacity) ? 'is-invalid' : ''}`} placeholder="Event capacity..."
              value={event.capacity} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.capacity}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw"></i></span>
            <input type="text" name="image" className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`} placeholder="Event image..."
              value={event.image} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.image}</div>
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-globe fa-fw"></i></span>

            <span className="input-group-text">Latitude</span>
            <input name="latitude" type="number" className={`form-control ${(touch.latitude && errors.latitude) ? 'is-invalid' : ''}`}
              value={event.latitude} onBlur={handleBlur} onChange={handleChange} />

            <span className="input-group-text">Longitude</span>
            <input name="longitude" type="number" className={`form-control ${(touch.longitude && errors.longitude) ? 'is-invalid' : ''}`}
              value={event.longitude} onBlur={handleBlur} onChange={handleChange} />

            {touch.latitude && errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            {touch.longitude && errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-clock-o fa-fw"></i></span>

            <span className="input-group-text">Start</span>
            <input type="datetime-local" name="start" className={`form-control ${(touch.start && errors.start) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
              value={event.start} onBlur={handleBlur} onChange={handleChange} />

            <span className="input-group-text">End</span>
            <input name="end" type="datetime-local" className={`form-control ${(touch.end && errors.end) ? 'is-invalid' : ''}`} placeholder="dd/mm/yyyy hh:mm"
              value={event.end} onBlur={handleBlur} onChange={handleChange} />

            {touch.start && errors.start && <div className="invalid-feedback">{errors.start}</div>}
            {touch.end && errors.end && <div className="invalid-feedback">{errors.end}</div>}
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
            <input type="text" name="tags" className={`form-control ${(touch.tags && errors.tags) ? 'is-invalid' : ''}`} placeholder="Coma separated event tags..."
              value={event.tags} onBlur={handleBlur} onChange={handleChange} />
            <div className="invalid-feedback">{errors.tags}</div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={!isValid()}>Create Event</button>
        </form>
      </div>
    </div>

  );
}

export default EventForm;
