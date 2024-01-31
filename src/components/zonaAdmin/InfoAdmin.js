// Importamos los paquetes necesarios
import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

// Definición del componente
export default class InfoAdmin extends Component {
    // Referencias a las cajas del formulario
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

    // Estado del componente
    state = {
        statusInformacion: false,       // Indica si se ha cargado la información del usuario
        informacion: {},                // Almacena la información del usuario
        statusPutInformacion: false,    // Indica si la actualización del usuario fue exitosa
        redirectTo: null                // Almacena la ruta a la que se redirigirá después de la actualización
    }

    // Función para obtener la información del usuario
    getInformacion = () => {
        var id = parseInt(localStorage.getItem('idUsuario'));
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = "api/usuarios/"+id;
        var url = Global.urlApi + request;

        axios.get(url, { headers }).then(response => {
            // Actualiza el estado con la información del usuario
            this.setState({
                statusInformacion: true,
                informacion: response.data,
            });
        }).catch(error => {
            console.error('Error al obtener información del perfil:', error);
            this.setState({
                error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.'
            });
        });
    }

    // Función para habilitar la edición de campos del formulario
    ableCamps = (e) => {
        e.preventDefault();
        const campos = [
            this.cajaIdUsuario,
            this.cajaNombre,
            this.cajaApellido,
            this.cajaEmail,
            this.cajaTelf,
            this.cajaLinkedin,
            this.cajaPass,
            this.cajaIdRole,
            this.cajaIdProvincia,
            this.cajaIdEmpresaCentro,
            this.cajaEstado,
        ];
      
        // Habilita la edición de los campos
        campos.forEach((campo) => {
            if (campo.current) {
                campo.current.removeAttribute('disabled');
            }
        });
    };

    // Función para actualizar la información del usuario
    putInformacion = (e) => {
        e.preventDefault();
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = "api/usuarios";
        var url = Global.urlApi + request;

        // Obtención de los valores de los campos del formulario
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

        if (idEmpresaCentro === "") {
            idEmpresaCentro = null;
        }

        var estado = this.cajaEstado.current.value;

        var data = {
            // Construcción del objeto de datos a enviar en la solicitud PUT
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
            // Alerta de usuario actualizado
            alert("Usuario actualizado");
            // Recarga la página después de un breve tiempo (puedes ajustar el tiempo según sea necesario)
            setTimeout(() => {
                window.location.reload();
            }, 100);
            // Actualiza el estado indicando que la actualización fue exitosa
            this.setState({
                statusPutInformacion: true,
            });
        }).catch(error => {
            console.error('Error al actualizar usuario:', error);
        });
    }

    // Función que se ejecuta al montar el componente, obtiene la información del usuario
    componentDidMount() {
        this.getInformacion();
    }

    // Función que se ejecuta al actualizar el componente
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.statusPutInformacion && this.state.statusPutInformacion !== prevState.statusPutInformacion) {
    //         // Redirige a /zonaAdmin después de una actualización exitosa
    //         alert("entro");
    //         this.setState({ redirectTo: "/zonaAdmin" });
    //     }
    // }

    // Función que renderiza el componente
    render() {
        return (
            <div>
                <div className="dashboard-body">
                    <div className="container my-4">
                        <h2 className="text-center mb-4">Informacion Perfil</h2>
                        <form>
                            {/* Campos del formulario */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Id Usuarios </label>
                                    <input type="text" className="form-control" defaultValue={this.state.informacion.idUsuario} ref={this.cajaIdUsuario} disabled/>
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

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Estado </label>
                                    <input type="text" className="form-control"  defaultValue={this.state.informacion.estado} ref={this.cajaEstado} disabled />
                                </div>
                            </div>
                        </form>
                        {/* Botones para activar edición y actualizar datos */}
                        <button type="submit" className="btn btn-warning" onClick={this.ableCamps}>Activar Edicion</button>
                        <button type="submit" className="btn btn-success" onClick={this.putInformacion}>Actualizar Datos</button>
                    </div>
                    {/* Redirección a la ruta especificada */}
                    {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />}
                </div>
            </div>
        );
    }
}

// Componente funcional para redirigir a una ruta específica
const RedirectTo = ({ path }) => {
    const navigate = useNavigate();

    // Se ejecuta al renderizar el componente y redirige a la ruta especificada
    useEffect(() => {
        navigate(path);
    }, [navigate, path]);

    // Retorna null ya que no renderiza nada directamente
    return null;
};
