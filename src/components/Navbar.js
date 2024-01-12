import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logotechriders.png';
import '../styles/Navbar.css';

class MenuRutas extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Logo" className='logo'/>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/otraruta" className="nav-link">Otra Ruta</NavLink>
          <NavLink to="/otraruta2" className="nav-link">Otra Ruta 2</NavLink>
          <NavLink to="/otraruta3" className="nav-link">Otra Ruta 3</NavLink>
        </div>

      </div>
    );
  }
}

export default MenuRutas;
