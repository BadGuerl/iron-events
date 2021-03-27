import { Component, Fragment, useEffect, useState } from 'react';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import eventsService from '../../services/events-service';

function EventDetail() {

  const history = useHistory();
  const params = useParams();
  const [event, setEvent] = useState();

  useEffect(() => { // el return de la funcion es la que hace de render
    // componentDidMount
    
    async function fetchEvent() {
      try {

      } catch
    }

    return () => {
      // componentWillUnmount

    }
  }, [])

  componentDidMount() {
    const { id } = this.props.match.params;
    eventsService.get(id)
      .then(event => this.setState({ event }))
      .catch(error => {
        if (error?.response?.status === 404) {
          this.setState({ notFound: true })
        } else {
          console.error(error);
        }
      })
  }

  render() {

    const { event, notFound } = this.state;
    
    if (notFound) {
      return (<Redirect to="/events"/>)
    } else if (!event) {
      return null;
    } else {

      const { image, title, description, tags, capacity, start, end } = event;

      return (
        <Fragment>
          <div className="row row-cols-1 mb-4">
            <div className="col text-center">
              <img src={image} alt={title} className="img-fluid" />
            </div>
            <div className="col">
              <h1 className="mt-4 mb-2">{title}</h1>
              <div className="d-flex flex-row mb-2">
                <span className="badge rounded-pill bg-info me-2 p-2"><i className="fa fa-users me-1"></i>0 / {capacity}</span>
                <span className="badge rounded-pill bg-danger me-2 p-2"><i className="fa fa-clock-o me-1"></i>{moment(start).format('llll')} to {moment(end).format('llll')}</span>
              </div>
              {description.split('\n').map(p => <p>{p}</p>)}
            </div>
            {tags && (
              <div className="col">
                {tags.map(tag => <span className="">{<span className="badge rounded-pill bg-secondary me-2">{tag}</span>}</span>)}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col">
              <Link to="/events" className="fw-lighter"><i className="fa fa-angle-left"></i> Back to Events</Link>
            </div>
          </div>
        </Fragment>
        
      );
    }
  }
}

export default EventDetail;
