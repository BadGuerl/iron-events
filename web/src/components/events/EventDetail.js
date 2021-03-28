import { useState, useEffect, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import moment from 'moment';

import eventsService from '../../services/events-service';

function EventDetail() {

  const history = useHistory();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState();

  /*
Equivalencias entre componente funcional y de clase:

- useEffect == componentDidMount
- la función que devuelve useEffect == componentWillUnmount
*/
  useEffect(() => {
    // componentDidMount
    async function fetchEvent() { // traer los eventos (fetchevent)
      try {
        const { id } = params; //  nos traemos el identificador del evento, con el params
        console.info(`Fetching event ${id}...`);
        const event = await eventsService.get(id); // aqui se hace el await de un evento
        if (!isUnmounted) {  //solo en caso de que este desmontado el componente seguira la siguiente logica
          setEvent(event);
        }
      } catch (error) {
        if (!isUnmounted) {  //solo en caso de que este desmontado el componente seguira la siguiente logica
          if (error?.response?.status === 404) { // if (error && error.response && error.response.status === 400)
            history.push('/events');
          } else {
            console.error(error);
          }
        }
      }
    }

    let isUnmounted = false; // si el componente ya esta montado, esto da false y no se monta el componente
    fetchEvent(); // ejecuta la funcion fetchevent

    return () => {
      // componentWillUnmount
      isUnmounted = true;  // solo se ejecuta en caso de que se desmonte el componente
    }
  }, [history, params]); // array super importante, para que no se setee continuamente
  // en el array se dice que solo se setee cuando cambie algo en history o params
  // ^^ El segundo argumento representa el array de dependencias ([]), 
  // solo se volverá a ejecutar la función de useEffect cuando cambie el valor de una de sus dependecias 
  // (si está vacío solo se ejecutará una vez)

  const handleDeleteEvent = async () => {
    await eventsService.remove(event.id);
    history.push('/events');
  }

  if (!event) {
    return null;
  } else {

    const { image, title, description, tags, capacity, start, end, owner } = event;

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
            <div className="text-muted fst-italic fw-light mb-2">By {owner.name}</div>
            {description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {tags && (
            <div className="col">
              {tags.map(tag => <span key={tag}>{<span className="badge rounded-pill bg-secondary me-2">{tag}</span>}</span>)}
            </div>
          )}
        </div>

        {user?.id === event.owner.id && (
          <div className="col my-3 text-center">
            <div className="alert alert-secondary" role="alert">
              <h4 className="fw-light mb-2">Admin Area</h4>
              <div className="btn-group" role="group">
                <Link className="btn btn-secondary" to={`/events/${event.id}/edit`}>Update</Link>
                <button type="button" className="btn btn-danger" onClick={handleDeleteEvent}>Delete</button>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col">
            <Link to="/events" className="fw-lighter"><i className="fa fa-angle-left"></i> Back to Events</Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EventDetail;
