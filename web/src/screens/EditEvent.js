import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router';
import EventForm from '../components/events/EventForm';
import { AuthContext } from '../contexts/AuthStore';

import eventsService from '../services/events-service';

function EditEvent() {

  const params = useParams();
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState();

  useEffect(() => {
    async function fetchEvent() {
      const { id } = params;
      const event = await eventsService.get(id);
      if (!isUnmounted) {
        if (user?.id !== event.owner.id) {
          history.push('/403')
        } else {
          // Prepare model for EventForm
          event.latitude = event.location[1];
          event.longitude = event.location[0];
          event.start = moment(event.start).format('yyyy-MM-DDThh:mm');
          event.end = moment(event.end).format('yyyy-MM-DDThh:mm');
          delete event.location;
          event.tags = event.tags.join(',');
          setEvent(event);
        }
      }
    }

    let isUnmounted = false;
    fetchEvent();
    return () => {
      isUnmounted = true;
    }
  }, [params, history, user]);
  
  if (!event) {
    return null;
  }

  return (
    <EventForm event={event} />
  )
}

export default EditEvent;
