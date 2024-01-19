import React, { Component, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Global from './Global';
import Navbar from './Navbar';
import Footer from './Footer';
// Optimizacion de codigo, no borrar el antiguo

export default class Login extends Component {
  cajaEmail = React.createRef();
  cajaContrasena = React.createRef();

  state = {
    statusToken: false,
    token: "",
    statusUsuarios: false,
    usuarios: [],
    redirectTo: null // Nueva variable para redireccionar
  }

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
  
      // Global
      Global.tipoUsuario = response.data.idRole;
      Global.token = this.state.token;

      // Guardar en localStorage
      localStorage.setItem('tipoUsuario', response.data.idRole);
      localStorage.setItem('token', this.state.token);
  
      alert("Dato añadido al global usuario");
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
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
            <br />
            <button type="submit" className="btn btn-primary" onClick={this.capturarToken}>Login</button>
          </form>
        </div>
        {
        
        this.state.statusUsuarios === true && (
          <div>
            {this.state.usuarios.idRole === 1 && (
              <div>
                {Global.tipoUsuario = 1}
                {this.setState({ redirectTo: "/areaAdmin" })} 
              </div>
            )}
            {this.state.usuarios.idRole === 2 && (
              <div>
                {Global.tipoUsuario = 2}
                {this.setState({ redirectTo: "/areaProfesor" })} 
              </div>
            )}
            {this.state.usuarios.idRole === 3 && (
              <div>
                {Global.tipoUsuario = 3}
                {this.setState({ redirectTo: "/areaTech" })} 
              </div>
            )}
            {this.state.usuarios.idRole === 4 && (
              <div>
                {Global.tipoUsuario = 4}
                {this.setState({ redirectTo: "/areaRepresentante" })} 
              </div>
            )}
            {this.state.usuarios.idRole === 0 && (
              <div>
                {alert("Usuario aún no validado")}
              </div>
            )}
          </div>
        )
        
        }
        <Footer />
        {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />} 
      </div>
    );
  }
}

// Metodo para Redireccionar sin NavLink
const RedirectTo = ({ path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return null;
};