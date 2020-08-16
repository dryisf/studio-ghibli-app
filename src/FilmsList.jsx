import React, { useState, useEffect } from 'react';
import $ from "jquery";
import Film from './Film';
import FilmDetails from './FilmDetails';
import './Film.scss';

const FilmsList = () => {
  const [films, setFilms] = useState([]);

  const [releaseDates, setReleaseDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [directors, setDirectors] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState("");

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedFilm, setSelectedFilm] = useState({});

  useEffect(() => {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setFilms(data);

        let years = [];
        let names = [];

        for (const film of data) {
          if(years.indexOf(film.release_date) === -1)
            years.push(film.release_date);

          if(names.indexOf(film.director) === -1)
            names.push(film.director);
        }

        setReleaseDates(years);
        setDirectors(names);
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

    if (selectedDate !== "" && selectedDirector !== ""){
      results = films.filter(films => films.title.toLowerCase().includes(search.toLowerCase()) && films.release_date.includes(selectedDate) && films.director.includes(selectedDirector));
    }
    else if (selectedDate === "" && selectedDirector !== ""){
      results = films.filter(films => films.title.toLowerCase().includes(search.toLowerCase()) && films.director.includes(selectedDirector));
    }
    else if (selectedDate !== "" && selectedDirector === ""){
      results = films.filter(films => films.title.toLowerCase().includes(search.toLowerCase()) && films.release_date.includes(selectedDate));
    }
    else {
      results = films.filter(films => films.title.toLowerCase().includes(search.toLowerCase()));
    }

    setSearchResults(results);
  }, [search, selectedDate, selectedDirector, films])

  const displayDetails = (film) => {
    setSelectedFilm(film);
    if (!($('.FilmDetails').hasClass('toggled'))){
      $('.FilmDetails').toggleClass("toggled");
    }
    if (window.matchMedia("(max-width: 600px)").matches) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }

  const closeDetails = () => {
    setSelectedFilm(undefined);
    $('.FilmDetails').toggleClass("toggled");
  }

  return (
    <div className="FilmsList">

      <input placeholder="Enter a title" type="text" value={search} onChange={onChange}/>

      <select name="years" onChange={selectDate} value={selectedDate}>
        <option value="">Year</option>
        {releaseDates.map((date) => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>

      <select name="directors" onChange={selectDirector} value={selectedDirector}>
        <option value="">Director</option>
        {directors.map((director) => (
          <option key={director} value={director}>{director}</option>
          ))}
      </select>

      { <FilmDetails data={selectedFilm} onClose={() => closeDetails()} /> }
      <div className="Films">
        {searchResults.map((film) => (
            <Film key={film.id} data={film} onClick={() => displayDetails(film)}  />
        ))}
        {searchResults.length === 0 && (
          <p>No films found</p>)
        }
      </div>

    </div>
  );
}

export default FilmsList;