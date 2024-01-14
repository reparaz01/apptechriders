import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logotechriders.png';
import './../styles/Navbar.css'

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle"; 

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid"> {/* Cambiado de "container" a "container-fluid" */}
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo"  /> {/* Ajustar el tamaño del logo */}
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/otraruta" className="nav-link">
                  Iniciar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
