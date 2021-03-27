import moment from 'moment';
import { Link } from 'react-router-dom';

function EventItem({ event: { id, title, image, start } }) {
  return (
    <div className="card shadow-sm rounded-0 border-0">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{moment(start).format('llll')}</span>
        <Link className="stretched-link link-unstyled" to={`/events/${id}`}><h5 className="card-title mt-2">{title}</h5></Link>
      </div>
    </div>
  )
}

export default EventItem;
