import React from 'react';
import FilmsList from './FilmsList';
import './App.css';
import $ from "jquery";
import anime from 'animejs';
import Logo from './logoGhibli.svg';

$(document).ready(function () {
  animation();
});

function animation(){
  anime({
    targets: '.Films',
    opacity: [0,1],
    duration: 1000,
    easing: 'linear',
  });
}

function App() {

  return (
    <div className="App">
      <img src={Logo} class="logo" alt="Logo studio ghibli"></img>
      <FilmsList />
    </div>
  );
}

export default App;
