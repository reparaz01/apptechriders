import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logotechriders.png';
import './../styles/Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle"; 
import Global from './Global';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoUsuario: Global.tipoUsuario,
    };
  }

  componentDidUpdate() {
    const { tipoUsuario } = Global;
    if (this.state.tipoUsuario !== tipoUsuario) {
      this.setState({ tipoUsuario });
    }
    console.log("NAVBAR "+Global.tipoUsuario)
    console.log("NAVBAR "+Global.token)
  }

  render() {
    const { tipoUsuario } = this.state;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo" />
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>

              {tipoUsuario === 0 ? (
                <>
                  <li className="nav-item">
                    <NavLink to={"/login"} className="nav-link">
                      Iniciar Sesión
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="http://localhost:3000/areaTech" id="areaPersonalDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Área Personal
                    </a>
                    <div className="dropdown-menu" aria-labelledby="areaPersonalDropdown">
                      <NavLink to={"/area-personal"} className="dropdown-item">Área Personal</NavLink>
                      <div className="dropdown-divider"></div>
                      <NavLink to={"/logout"} className="dropdown-item">LogOut</NavLink>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/charlas"} className="nav-link">
                      Charlas
                    </NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to={"/contacto"} className="nav-link">
                  Contacto
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
