import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Registro from './Registro';
import Contacto from './Contacto';

// Zona Admin
import ZonaAdmin from './zonaAdmin/DashboardAdmin';
import TodosUsuarios from './zonaAdmin/TodosUsuarios';
import InfoAdmin from './zonaAdmin/InfoAdmin';
import InfoUsuario from './zonaAdmin/InfoUsuario';
import TodosEstadoUsuario from './zonaAdmin/TodosEstadoUsuario';
import TodosEstadoCharla from './zonaAdmin/TodosEstadoCharla';
// Fin zona Admin

import EditarProfesor from './zonaProfesor/EditarProfesor';
import AreaProfesor from './zonaProfesor/AreaProfesor';
import RegistrarCurso from './RegistrarCurso';

import RegistrarEmpresaCentro from './RegistrarEmpresaCentro';

import AreaTechRider from './zonaTechRider/AreaTechRider';
import EditarTechRider from './zonaTechRider/EditarTechRider';
import RegistrarTecnologia from './RegistrarTecnologia';

import AreaRepresentante from './zonaRepresentante/AreaRepresentante';
import EditarRepresentante from './zonaRepresentante/EditarRepresentante';

import Charlas from './charlas/Charlas';
import DetallesCharla from './charlas/DetallesCharla';
import RegistrarCharla from './charlas/RegistrarCharla';

export default class Router extends Component {
  render() {

  //Funciones zona Admin
  function IdUsuarioPerfil (){
    var {idusuario} = useParams();
    return <InfoUsuario idusuario={idusuario} />
  }

  function IdEstadoUsuario (){
    var {idestado} = useParams();
    return <TodosEstadoUsuario idestado={idestado} />
  }

  function IdEstadoCharla (){
    var {idestado} = useParams();
    return <TodosEstadoCharla idestado={idestado} />
  }
  //Fin funciones zona Admin

   
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

          {/* Rutas zona Admin */}
          <Route path="/zonaAdmin" element={<ZonaAdmin />} />
          <Route path="/todosUsuarios" element={<TodosUsuarios />} />
          <Route path='/todosEstadoUsuarios/:idestado' element={<IdEstadoUsuario/>} />
          <Route path="/infoPerfil" element={<InfoAdmin />} />
          <Route path='/infoUsuario/:idusuario' element={<IdUsuarioPerfil/>} />
          <Route path='/todosEstadoCharla/:idestado' element={<IdEstadoCharla/>} />
          {/* Fin Rutas zona Admin */}

          <Route path="/editarProfesor" element={<EditarProfesor />} />
          <Route path="/areaProfesor" element={<AreaProfesor />} />

          <Route path="/registrarEmpresaCentro" element={<RegistrarEmpresaCentro />} />
          <Route path="/registrarCurso" element={<RegistrarCurso />} />

          <Route path="/areaTechRider" element={<AreaTechRider />} />
          <Route path="/editarTechRider" element={<EditarTechRider />} />
          <Route path="/registrarTecnologia" element={<RegistrarTecnologia />} />
          
          <Route path="/areaRepresentante" element={<AreaRepresentante />} />
          <Route path="/editarRepresentante" element={<EditarRepresentante />} />

          
        </Routes>
      </BrowserRouter>
    );
  }
}