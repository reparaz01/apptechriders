import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Registro from './Registro';
import Contacto from './Contacto';
import ZonaAdmin from './zonaAdmin/DashboardAdmin';
import EditarPerfil from './zonaAdmin/EditarPerfil';
import EditarProfesor from './zonaProfesor/EditarProfesor';
import AreaTech from './AreaTech';
import AreaProfesor from './zonaProfesor/AreaProfesor';
import AreaRepresentante from './zonaRepresentante/AreaRepresentante';

 /* import { useParams } from 'react-router-dom'; */

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
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/zonaAdmin" element={<ZonaAdmin />} />
          <Route path="/editarPerfil" element={<EditarPerfil />} />
          <Route path="/editarProfesor" element={<EditarProfesor />} />
          <Route path="/areaTech" element={<AreaTech />} />
          <Route path="/areaProfesor" element={<AreaProfesor />} />
          <Route path="/areaRepresentante" element={<AreaRepresentante />} />
        </Routes>
      </BrowserRouter>
    );
  }
}