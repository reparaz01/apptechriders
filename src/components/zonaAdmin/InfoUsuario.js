//Este componente muestra la informacion de un usuario seleccionado de la tabla que lo llama.

//Importamos todos los recursos necesarios para el funcionamiento.
import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class InfoUsuario extends Component {

    //Zona state , donde las valores de las variables cambiaran. 
    state = {

        informacion: {},

        statusInformacion: false,

        error: null
    }

    // Funciones //

    //Funcionalidad getInformacion(). Obtiene la informacion de un usuarios mediante una ID
    //En este caso el ID es recuperado mediante parametros en la url.
    getInformacion = () => {

        var idUsuarioRuta = this.props.idusuario;

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/usuarios/"+idUsuarioRuta;

        var url = Global.urlApi + request;

        axios.get(url,{ headers }).then(response => {

            this.setState({

                informacion : response.data,

                statusInformacion : true,

                error: null
            });
        })
        .catch(error => {
            
            console.error('Error al obtener información del perfil:', error);
            
            this.setState({
            
                error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.'
            
            });
        });
    }

    //Funcionalidad significadoEstado(). Cambia el numero que recibimos del estado del usuario por su significado (Mero dibujo).
    significadoEstado = (estado) => {
        switch (estado) {
          case 0:
            return "BAJA";
          case 1:
            return "ACTIVO";
          case 2:
            return "PENDIENTE";
          default:
            return "Desconocido";
        };
    }

    //Funcionalidad. Permite cambiar el estado del usuario a BAJA.
    bajaUsuario = (e) => {

        e.preventDefault();

        var idUsuarioRuta = this.props.idusuario;

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/Usuarios/UpdateEstadoUsuario/" + idUsuarioRuta + "/" + 0;

        var url = Global.urlApi + request;

        axios.put(url,{},{headers}).then(response => {

            console.log(response.data);

            alert("Usuario dado de baja correctamente ")

            this.getInformacion();
        })


    }

    ////Funcionalidad. Permite cambiar el estado del usuario a ACTIVO.
    activarUsuario = (e) =>{

        e.preventDefault();

        var idUsuarioRuta = this.props.idusuario;

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/usuarios/updateestadousuario/" + idUsuarioRuta + "/" + 1;

        var url = Global.urlApi + request;

        axios.put(url,{},{headers}).then(response => {

            console.log(response.data);
            
            alert("Usuario dado de alta correctamente ")

            this.getInformacion();
        })
    }

    //Todo lo que este dentro se cargara al iniciar la pagina.
    componentDidMount () {

        this.getInformacion();
    }


  render() {
    return (
        <div>
            <div className="header">
                <Navbar />
            </div>
            <div className="container my-4">

                {/* Muestra un texto con el nombre del usuario */}
                <h2 className="text-center mb-4">Informacion de {this.state.informacion.nombre}</h2>
                
                {/* Muestra los errores que encuentra */}
                {this.state.error && 
                    <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                }

                {/* Carga el contenido si statusinformacion es true */}
                {
                    this.state.statusInformacion === true && 
                    (
                        <div>

                            {/* Dependiendo del estado del usuario mostrara una serie de alertas */}
                            {this.state.informacion.estado === 0 && (
                                <div className="alert alert-danger" role="alert">
                                    Este usuario está en estado BAJA.
                                </div>
                            )}
                            {this.state.informacion.estado === 1 && (
                                <div className="alert alert-success" role="alert">
                                    Este usuario está en estado ACTIVO.
                                </div>
                            )}
                            {this.state.informacion.estado === 2 && (
                                <div className="alert alert-warning" role="alert">
                                    Este usuario está en estado PENDIENTE.
                                </div>
                            )}

                            {/* Formulario */}
                            <form>
                                <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Id Usuarios </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.idUsuario} ref={this.cajaIdUsuario} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Nombre </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.nombre} ref={this.cajaNombre} disabled/>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Apellido </label>
                                            <input type="text" className="form-control"   defaultValue={this.state.informacion.apellidos} ref={this.cajaApellido} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Email </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.email} ref={this.cajaEmail} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Telefono </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.telefono} ref={this.cajaTelf} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">LinkedIn </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.linkedIn} ref={this.cajaLinkedin} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Password </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.password} ref={this.cajaPass} disabled/>
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Id Role </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.idRole} ref={this.cajaIdRole} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Id Provincias </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.idProvincia} ref={this.cajaIdProvincia} disabled />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Id Empresa/Centro </label>
                                            <input type="text" className="form-control"  defaultValue={this.state.informacion.idEmpresaCentro} ref={this.cajaIdEmpresaCentro} disabled />
                                        </div>

                                        {/* div del estado del usuario, hay varias cositas */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Estado </label>
                                            {/* Cambia el numero del estado por su significado (llama a la funcion significadoEstado()) */}
                                            <input type="text" className="form-control"  defaultValue={this.significadoEstado(this.state.informacion.estado)} ref={this.cajaEstado} disabled />
                                            
                                            {/* Muestra una serie de botones segun el estado del usuario  */}
                                            {this.state.informacion.estado === 0 && (
                                                <button className="btn btn-primary mt-2" onClick={this.activarUsuario}>
                                                    Activar Usuario
                                                </button>
                                            )}
                                            {this.state.informacion.estado === 1 && (
                                                <button className="btn btn-warning mt-2" onClick={this.bajaUsuario}>
                                                    Dar de Baja Usuario
                                                </button>
                                            )}
                                            {this.state.informacion.estado === 2 && (
                                                <div>
                                                    <button className="btn btn-success mt-2">
                                                        Aceptar Usuario
                                                    </button>
                                                    <button className="btn btn-danger mt-2 ms-2">
                                                        Rechazar Usuario
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
  }
}
