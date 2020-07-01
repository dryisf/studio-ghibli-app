import React from 'react';


const Film = ({data, onClick}) => (
  <div className="Film" onClick={onClick}>
    <div className="Film-img-wrap">
      <img src={process.env.PUBLIC_URL + '/img/'+ data.title +'.jpg'} alt="affiche film"/>
      <p>{data.title} – {data.release_date} ({data.director})</p>
    </div>
  </div>
);

export default Film;