import React, { Component, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Global from './Global';
import Navbar from './Navbar';
import Footer from './Footer';
import loginimage from '../assets/images/Login.jpg';

// Optimizacion de codigo, no borrar el antiguo

export default class Login extends Component {
  cajaEmail = React.createRef();
  cajaContrasena = React.createRef();

  state = {
    statusToken: false,
    token: "",
    statusUsuarios: false,
    usuarios: [],
    redirectTo: null // variable para redireccionar
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
      alert('Usuario o Contraseña Incorrectos');
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
  
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  render() {
    return (
      <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
  <Navbar />
  <div className="container mt-3 flex-grow-1 d-flex justify-content-center align-items-center">
    {/* Tarjeta de Bootstrap */}
    <div className="card col-md-7 mt-3 p-5"> {/* Aumenté el ancho de la tarjeta y añadí padding */}
      <div className="card-body d-flex align-items-center flex-column"> {/* Añadí flex-column para centrar los elementos verticalmente */}
        {/* Agregar imagen a la izquierda con más espacio */}
        <img
          src={loginimage}
          alt="Descripción de la imagen"
          className="img-fluid mb-4" // Añadí margen inferior
          style={{ maxWidth: '300px', maxHeight: '300px', marginTop:'-30px' }}
        />

        {/* Formulario con cuadros de texto más largos y centrados */}
        <form className="w-75 text-center"> {/* Ajusté el ancho del formulario y centré los elementos */}
          <div className="mb-4">
            <p style={{ color: 'black', marginBottom: '5px', fontSize: '20px', fontWeight: 'bolder' }}>Correo Electrónico</p>
            <input type="email" className="form-control" id="exampleInputEmail1" ref={this.cajaEmail} />
          </div>
          <div className="mb-4">
            <p style={{ color: 'black', marginBottom: '5px', fontSize: '20px', fontWeight: 'bolder' }}>Contraseña</p>
            <input type="password" className="form-control" id="exampleInputPassword1" ref={this.cajaContrasena} style= {{marginBottom: '40px'}} />
          </div>
          <button type="submit" className="btn btn-dark btn-lg w-100" onClick={this.capturarToken}>
            Iniciar Sesión
          </button>
          <div id="registrolHelp" className="form-text font-weight-bold">
            ¿No tienes cuenta? <NavLink to='/registro' className="nav-link text-primary">Regístrate</NavLink>.
          </div>
        </form>
      </div>
    </div>
  </div>
        {
        
        this.state.statusUsuarios === true && (
          <div>
            {this.state.usuarios.idRole === 1 && (
              <div>
                {Global.tipoUsuario = 1}
                {this.setState({ redirectTo: "/zonaAdmin" })} 
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