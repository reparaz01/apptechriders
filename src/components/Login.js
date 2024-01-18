import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Global from './Global';
import Navbar from './Navbar';
import Footer from './Footer';
// Optimizacion de codigo, no borrar el antiguo

export default class Login extends Component {

  // Referencias Cajas.
  cajaEmail = React.createRef();

  cajaContrasena = React.createRef();

  // Zona state , donde se ira cambiando el valor.
  state = {

    statusToken : false,

    token : "",

    statusUsuarios : false,

    usuarios: []
  }

  ///** */ Zona Funciones **///

  //Funcionalidad: Metodo Post del Api donde se manda el email y la contraseña para obtenet el token del usuario.
  capturarToken = async (e) => {
    e.preventDefault();

    const email = this.cajaEmail.current.value;

    const contrasena = this.cajaContrasena.current.value;

    const request = 'api/auth/login';

    const url = Global.urlApi + request;

    const datos = {

      email: email,

      password: contrasena
    };

    try {
      const response = await axios.post(url, datos);

      this.setState(
        {
          statusToken: true,

          token: response.data.response
        },
        () => {

          this.GetUsuarios();
        }
      );
    } catch (error) {

      console.error('Error al capturar token:', error);

      alert('Datos erroneos, compruebelo !!!');
    }
  };

  //Funcionalidad: Metodo Get del Api , donde se hace la peticion y le mandamos un header con el token capturado con la finalidad de
  //que nos devuelva la informacion de este usuario. Para evitar un bucle infinito cambiamos a false el statusToken.
  GetUsuarios = async () => {

    const request = 'api/usuarios/perfilusuario';

    const url = Global.urlApi + request;

    const headers = { Authorization: 'Bearer ' + this.state.token };

    try {

      const response = await axios.get(url, { headers });

      this.setState({

        statusUsuarios: true,

        usuarios: response.data,

        statusToken: false
      });
    } catch (error) {

      console.error('Error al obtener usuarios:', error);
    }
    //console.log(this.state.usuarios.idRole);
    
    Global.tipoUsuario = this.state.usuarios.idRole;
    
    alert("Dato añadido al global usuario");
  };

  render() {
    return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <Navbar />
        <div className="container mt-5 flex-grow-1">
          <form className="col-md-6 mx-auto">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" ref={this.cajaEmail}/>
              <div id="emailHelp" className="form-text">Introduce email.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" ref={this.cajaContrasena}/>
              <div id="passwordlHelp" className="form-text">Introduce contraseña.</div>
            </div>
            <div id="registrolHelp" className="form-text">
              ¿No tienes cuenta? <NavLink to='/registro' className="nav-link text-primary">Regístrate</NavLink>.
            </div>

            <br/>
            <button type="submit" className="btn btn-primary" onClick={this.capturarToken}>Login</button>
          </form>
        </div>
        {
          this.state.statusUsuarios === true && (
            this.state.usuarios.idRole === 1 && (
              <NavLink to="/areaAdmin" className="navbar-brand">
              </NavLink>
            ),
            this.state.usuarios.idRole === 2 && (
              window.location=("areaProfesor")
            ),
            this.state.usuarios.idRole === 3 && (
              window.location=("areaTech")
            ),
            this.state.usuarios.idRole === 4 && (
              window.location=("areaRepresentante")
            ),
            this.state.usuarios.idRole === 0 && ( //Nuevo codigo añadido
              alert("Usuario aun no validado")
            )
          )
        }
        <Footer />
      </div>
    );
  }
  
}
