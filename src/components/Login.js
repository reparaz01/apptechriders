import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
//Posibles errores, las rutas. Mirarlo si falla
import axios from 'axios'
import Global from './Global';
import Navbar from './Navbar';
import Footer from './Footer';

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
  capturarToken = (e) => {

    e.preventDefault();

    var email = this.cajaEmail.current.value;

    var contrasena = this.cajaContrasena.current.value;

    var request = "api/auth/login";

    var url = Global.urlApi + request;

    var datos = {

      "email" : email,
      "password" : contrasena
    }

    axios.post(url,datos).then(response => {

      this.setState ({

        statusToken: true,

        token : response.data.response
      })
    })
    //Este catch nos permite mandar un mensaje al haber algun tipo de error.
    .catch(() => {

      alert("Datos erroneos, compruebelo !!!");
    })
  }

  //Funcionalidad: Metodo Get del Api , donde se hace la peticion y le mandamos un header con el token capturado con la finalidad de
  //que nos devuelva la informacion de este usuario. Para evitar un bucle infinito cambiamos a false el statusToken.
  GetUsuarios = () => {

    var request = "api/usuarios/perfilusuario";

    var url = Global.urlApi + request;

    var headers = {'Authorization':'Bearer ' + this.state.token }

    axios.get(url,{headers}).then(response => {

      this.setState({

        statusUsuarios : true,

        usuarios : response.data,

        statusToken : false
      })
    })
  }

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
          this.state.statusToken === true && (
            this.GetUsuarios()
          )
        }
        {
          this.state.statusUsuarios === true && (
            this.state.usuarios.idRole === 1 && (
              window.location=("areaAdmin")
            ),
            this.state.usuarios.idRole === 2 && (
              //Esto es para Profesor/Representante
              window.location=("areaProfesor")
            ),
            this.state.usuarios.idRole === 3 && (
              window.location=("areaTech")
            )
          )
        }
        <Footer />
      </div>
    );
  }
  
}
