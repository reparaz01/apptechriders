import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registro from './Registro';
import Contacto from './Contacto';
import AreaAdmin from './AreaAdmin';
import AreaTech from './AreaTech';
import AreaProfesor from './AreaProfesor';
import AreaRepresentante from './AreaRepresentante';

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
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/areaAdmin" element={<AreaAdmin />} />
          <Route path="/areaTech" element={<AreaTech />} />
          <Route path="/areaProfesor" element={<AreaProfesor />} />
          <Route path="/areaRepresentante" element={<AreaRepresentante />} />
        </Routes>
      </BrowserRouter>
    );
  }
}