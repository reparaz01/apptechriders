import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registro from './Registro';

import { useParams } from 'react-router-dom';

export default class Router extends Component {
  render() {

   /*

    function PersonajesElement(){
        var {idSerie, nombreSerie} = useParams();
        return<Personajes idSerie = {idSerie} nombreSerie = {nombreSerie}/>
    }

   */

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    );
  }
}