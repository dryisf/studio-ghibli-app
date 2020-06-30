import React, { useState, useEffect } from 'react';
import Film from './Film';
import './Film.scss';

const FilmsList = () => {
  const [films, setFilms] = useState([]);

  const [releaseDates, setReleaseDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("");

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

  const selectDate = (event) => {
    setSelectedDate(event.currentTarget.value);
  }

  const selectDirector = (event) => {
    setSelectedDirector(event.currentTarget.value);
  }

  useEffect(() => {
    let results;

    if(selectedDate !== "" && selectedDirector !== ""){
      results = films.filter(films => films.title.toLowerCase().includes(search) && films.release_date.includes(selectedDate) && films.director.includes(selectedDirector));
    }
    else if(selectedDate === "" && selectedDirector !== ""){
      results = films.filter(films => films.title.toLowerCase().includes(search) && films.director.includes(selectedDirector));
    }
    else if (selectedDate !== "" && selectedDirector === ""){
      results = films.filter(films => films.title.toLowerCase().includes(search) && films.release_date.includes(selectedDate));
    }
    else{
      results = films.filter(films => films.title.toLowerCase().includes(search));
    }

    setSearchResults(results);
  }, [search, selectedDate, selectedDirector])

  return (
    <div className="FilmsList">
      <input type="text" label="Entrer un titre" value={search} onChange={onChange}/>
      <select name="years" onChange={selectDate} value={selectedDate}>
        <option value="">Year</option>
        {releaseDates.map((date) => (
          <option value={date}>{date}</option>
        ))}
      </select>
      <select name="directors" onChange={selectDirector} value={selectedDirector}>
        <option value="">Director</option>
        {directors.map((director) => (
          <option value={director}>{director}</option>
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