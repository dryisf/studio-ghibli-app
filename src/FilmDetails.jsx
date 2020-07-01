import React from 'react';

const FilmDetails = ({data}) => (
  <div className="FilmDetails">
      <h2>Film sélectionnée : {data.title}</h2>
      <p>{data.description}</p>
  </div>
);

export default FilmDetails;