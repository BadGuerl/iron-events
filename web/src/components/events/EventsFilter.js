import { useState } from 'react';

function EventsFilter({ className, onSearch, loading }) {

  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    onSearch(value);
  }

  return (
    <div className={`row row-cols-1 ${className}`}>
      <div className="col">
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className={`fa fa-${loading ? 'refresh fa-spin': 'search'}`}></i>
          </span>
          <input type="text" name="title" className="form-control" placeholder="Search by title..."
            value={search} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

EventsFilter.defaultProps = {
  loading: false,
  className: '',
  onSearch: () => {}
}

export default EventsFilter;
