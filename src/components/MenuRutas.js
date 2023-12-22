import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logotechriders.png';
import '../styles/MenuRutas.css';

class MenuRutas extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className='logo'/>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/nuevopersonaje" className="nav-link">Nuevo Personaje</NavLink>
          <NavLink to="/modificarpersonajes" className="nav-link">Modificar Personajes</NavLink>
          <NavLink to="/otraruta" className="nav-link">Otra Ruta</NavLink>
          <NavLink to="/otraruta2" className="nav-link">Otra Ruta 2</NavLink>
          <NavLink to="/otraruta3" className="nav-link">Otra Ruta 3</NavLink>
        </div>
        <img src="http://icons.iconarchive.com/icons/visualpharm/icons8-metro-style/128/System-Login-icon.png" alt="Login" className="login" />
      </div>
    );
  }
}

export default MenuRutas;
