import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
//Posibles errores, las rutas. Mirarlo si falla
import axios from 'axios'
import Global from './Global';

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

    var url = Global.api + request;

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

    var url = Global.api + request;

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
      <div>
          <form>
              <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" ref={this.cajaEmail}/>
                  <div id="emailHelp" className="form-text">Introduce email.</div>
              </div>
              <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" ref={this.cajaContrasena}/>
                  <div id="passwordlHelp" className="form-text">Introduce contraseña.</div>
              </div>
                  <div id="registrolHelp" className="form-text">¿No tienes cuenta? <NavLink href='#'>Registrate</NavLink>.</div><br/>
                  <button type="submit" className="btn btn-primary" onClick={this.capturarToken}>Login</button>
          </form>
          {
            //Si la condicion es verdad llamamos a la funcion.
            this.state.statusToken === true && ( 

              this.GetUsuarios()
            )
          }
          {
            //Si la condicion es verdad entramos a las siguientes condiciones, donde comprobamos que tipo de usuario es.
            this.state.statusUsuarios === true && (

              this.state.usuarios.idRole === 1 && (
                //Aqui pondremos la navegacion hacia su pagina.
                alert("Eres Admin y nos vamos a tu pagina")
              ),
              this.state.usuarios.idRole === 2 && (
                //Aqui pondremos la navegacion hacia su pagina.
                alert("Eres Profesor/Representante y nos vamos a tu pagina")
              ),
              this.state.usuarios.idRole === 3 && (
                //Aqui pondremos la navegacion hacia su pagina.
                alert("Eres TechRider y nos vamos a tu pagina")
              )
            )
          }
      </div>
    )
  }
}
