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
import AreaProfesor from './zonaProfesor/AreaProfesor';
import RegistrarCurso from './RegistrarCurso';

import RegistrarEmpresaCentro from './RegistrarEmpresaCentro';

import AreaTech from './AreaTech';

import AreaRepresentante from './zonaRepresentante/AreaRepresentante';

import Charlas from './charlas/Charlas';
import DetallesCharla from './charlas/DetallesCharla';
import RegistrarCharla from './charlas/RegistrarCharla';

export default class Router extends Component {
  render() {

   
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route path="/charlas" element={<Charlas />} />
          <Route path="/detallesCharla" element={<DetallesCharla/>} />
          <Route path="/registrarCharla" element={<RegistrarCharla/>} />

          <Route path="/zonaAdmin" element={<ZonaAdmin />} />
          <Route path="/editarPerfil" element={<EditarPerfil />} />

          <Route path="/editarProfesor" element={<EditarProfesor />} />
          <Route path="/registrarEmpresaCentro" element={<RegistrarEmpresaCentro />} />
          <Route path="/registrarCurso" element={<RegistrarCurso />} />

          <Route path="/areaTech" element={<AreaTech />} />
          <Route path="/areaProfesor" element={<AreaProfesor />} />
          <Route path="/areaRepresentante" element={<AreaRepresentante />} />
        </Routes>
      </BrowserRouter>
    );
  }
}