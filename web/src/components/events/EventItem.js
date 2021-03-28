import moment from 'moment';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';

function EventItem({ event: { id, title, image, start, owner } }) {
  const { user } = useContext(AuthContext);

  return (
    <div className={`card shadow-sm ${user?.id === owner.id ? 'border border-info': ''}`}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <span className="fw-lighter" style={{ color: '#d1410c', fontSize: '12px' }}>{moment(start).format('llll')}</span>
        <Link className="stretched-link link-unstyled" to={`/events/${id}`}><h5 className="card-title mt-2">{title}</h5></Link>
      </div>
    </div>
  )
}

export default EventItem;
