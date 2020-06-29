import React from 'react';


const Film = ({data}) => (
  <div className="Film">
    <img src="https://via.placeholder.com/400x250"/>
    <div className="Film-infos">
      {data.title} – {data.release_date} ({data.director})
      <p>{data.description}</p>
    </div>
  </div>
);

export default Film;