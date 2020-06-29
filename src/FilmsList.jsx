import React, { useState, useEffect } from 'react';
import Film from './Film';
import './Film.css';

const FilmsList = () => {
  const [films, setFilms] = useState([]);
  const [releaseDates, setReleaseDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [directors, setDirectors] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFilms(data);

        let years = [];
        let names = [];

        data.map((film) => {
          if(years.indexOf(film.release_date) === -1)
            years.push(film.release_date);
          if(names.indexOf(film.director) === -1)
            names.push(film.director);
        })

        setReleaseDates(years);
        setDirectors(names);

        setSearch("");
      })
  }, []);

  const onChange = (event) => {
    setSearch(event.currentTarget.value);
  }

  useEffect(() => {
    const results = films.filter(films => films.title.toLowerCase().includes(search));
    setSearchResults(results);
  }, [search])

  const selectDate = (event) => {
    setSelectedDate(event.currentTarget.value);
  }

  useEffect(() => {
    const results = films.filter(films => films.release_date.toLowerCase().includes(selectedDate));
    setSearchResults(results);
  }, [selectedDate])

  return (
    <div className="FilmsList">
      <input type="text" value={search} label="Looking for a film ?" onChange={onChange}/>
      <select name="years" onChange={selectDate} value={selectedDate}>
        {releaseDates.map((date) => (
          <option value={date}>{date}</option>
        ))}
      </select>
      <div className="Films">
        {searchResults.map((film) => (
          <Film data={film} />
        ))}
      </div>
    </div>
  );
}

export default FilmsList;