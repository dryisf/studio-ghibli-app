import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const FilmDetails = ({data, onClose }) => {
    return (
      <div className="FilmDetails">
        <FontAwesomeIcon className="closeButton" icon={faTimesCircle} onClick={onClose} />
        {data !== undefined && (
        <div>
          <img src={process.env.PUBLIC_URL + '/img/' + data.title + '.jpg'} alt="affiche film" />
          <h2>{data.title} ({data.release_date})</h2>
          {data.director === data.producer ? (
            <p>Directed and produced by {data.director}</p>
            ) : (<p>Directed by {data.director} and produced by {data.producer}</p>)}
          <p>{data.description}</p>
        </div>
        )}
      </div>
    );
}

export default FilmDetails;