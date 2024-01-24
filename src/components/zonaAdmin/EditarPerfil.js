 //Importamos los paquetes necesarios
import React, { Component, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import Navbar from '../Navbar'
import Footer from '../Footer'
import flechaAtras from './../../assets/images/fechaAtras.webp';


export default class EditarPerfil extends Component {
    
    //Referenciamos a las cajas del formulario.
    cajaIdUsuario = React.createRef();

    cajaNombre = React.createRef();

    cajaApellido = React.createRef();

    cajaEmail = React.createRef();

    cajaTelf = React.createRef();

    cajaLinkedin = React.createRef();

    cajaPass = React.createRef();

    cajaIdRole = React.createRef();

    cajaIdProvincia = React.createRef();

    cajaIdEmpresaCentro = React.createRef();

    cajaEstado = React.createRef();

    //Zona state , donde los valores cambiaran.
    state = {

        statusInformacion: false,

        informacion: {},

        statusPutInformacion : false,

        redirectTo: null
    }

    // Funciones //

    //Funcionalidad. Permite obtener la informacion del usuario segun su id, en este caso los guarda como valor en los campos del form.
    getInformacion = () => {

        var id = parseInt(localStorage.getItem('idUsuario'));

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/usuarios/"+id;

        var url = Global.urlApi + request;

        axios.get(url,{ headers }).then(response => {

            this.setState({

                statusInformacion: true,

                informacion : response.data,
            });
        })
        .catch(error => {
            
            console.error('Error al obtener información del perfil:', error);
            
            this.setState({
            
                error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.'
            
            });
        });
    }

    //Funcionalidad. En el form habra campos deshabilitados por temas de precausion, esta funcion permite activarlos
    //si es necesario modificarlo.
    ableCamps = (e) => {

        e.preventDefault();

        const campos = [

            this.cajaIdUsuario,

            this.cajaIdRole,

            this.cajaIdProvincia,

            this.cajaIdEmpresaCentro,

            this.cajaEstado,
        ];
      
        campos.forEach((campo) => {

          if (campo.current) {

            campo.current.removeAttribute('disabled');
          }
        });
      };

    //Funcionalidad. Recoje el valor de los campos del form y los actualiza segun el idUsuario. 
    putInformacion = (e) => {

        e.preventDefault();

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/usuarios";

        var url = Global.urlApi + request;

        var idUsuario = this.cajaIdUsuario.current.value;

        var nombre = this.cajaNombre.current.value;

        var apellido = this.cajaApellido.current.value;

        var email = this.cajaEmail.current.value;

        var telf = this.cajaTelf.current.value;

        var linkedin = this.cajaLinkedin.current.value;

        var pass = this.cajaPass.current.value;

        var idRole = this.cajaIdRole.current.value;

        var idProvincia = this.cajaIdProvincia.current.value;

        var idEmpresaCentro = this.cajaIdEmpresaCentro.current.value;

        if(idEmpresaCentro === ""){

            idEmpresaCentro = null
        }

        var estado = this.cajaEstado.current.value;

        var data = {

            "idUsuario": idUsuario,
            "nombre": nombre,
            "apellidos": apellido,
            "email": email,
            "telefono": telf,
            "linkedIn": linkedin,
            "password": pass,
            "idRole": idRole,
            "idProvincia": idProvincia,
            "idEmpresaCentro": idEmpresaCentro,
            "estado": estado
        }

        axios.put(url, data, { headers }).then(response => {

          alert("Usuario actualizado");
          
          this.setState({
            
            statusPutInformacion: true,
          });
        })
        .catch(error => {

          console.error('Error al actualizar usuario:', error);
          
        });
        
    }

    componentDidMount () {

        this.getInformacion();
    }

    componentDidUpdate(prevProps, prevState) {
        // Verificar si statusPutInformacion ha cambiado y es verdadero
        if (this.state.statusPutInformacion && this.state.statusPutInformacion !== prevState.statusPutInformacion) {
          // Redirigir a /zonaAdmin
          this.setState({ redirectTo: "/zonaAdmin" });
        }
      }

  render() {
    return (
        <div>
            <div className="header">
                <Navbar />
            </div>
            <div className="dashboard-body">
                <div className="container my-4">
                    <NavLink to={"/zonaAdmin"}>
                        <img src={flechaAtras} width={"3%"} height={"3%"} alt='Pagina Anterior'/>
                    </NavLink>
                    <h2 className="text-center mb-4">Editar Perfil</h2>
                    <form>
                        <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Id Usuarios </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.idUsuario} ref={this.cajaIdUsuario} disabled/>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nombre </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.nombre} ref={this.cajaNombre} />
                            </div>
                            
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Apellido </label>
                                <input type="text" className="form-control"   defaultValue={this.state.informacion.apellidos} ref={this.cajaApellido} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.email} ref={this.cajaEmail} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Telefono </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.telefono} ref={this.cajaTelf} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">LinkedIn </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.linkedIn} ref={this.cajaLinkedin}/>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Password </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.password} ref={this.cajaPass}/>
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

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Estado </label>
                                <input type="text" className="form-control"  defaultValue={this.state.informacion.estado} ref={this.cajaEstado} disabled />
                            </div>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-warning" onClick={this.ableCamps}>Habilitar Campos</button>
                    <button type="submit" className="btn btn-success" onClick={this.putInformacion}>Actualizar Datos</button>
                </div>
            </div>
            <div className="footer">
                <Footer />
                {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />} 
            </div>
        </div>
    )
  }
}

const RedirectTo = ({ path }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate(path);
    }, [navigate, path]);
  
    return null;
  };
