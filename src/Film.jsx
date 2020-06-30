import React from 'react';


const Film = ({data}) => (
  <div className="Film">
    <div className="Film-img">
      <img src={process.env.PUBLIC_URL + '/img/'+ data.title +'.jpg'} alt="affiche film"/>
    </div>
    <div className="Film-infos">
      {data.title} – {data.release_date} ({data.director})
      <p>{data.description}</p>
    </div>
  </div>
);

export default Film;