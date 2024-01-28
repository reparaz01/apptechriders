import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Global from './../Global';
import axios from 'axios';

export default class AreaRepresentante extends Component {

    state = {
        informacion: {},
        statusInformacion: false,
        error: null,
        idProvincia: 0,
        provincia: {},
        centroUsuario: {},
        empresascentros: [],
        cursos: [],
        techriders : [],
    }

    getInformacion = () => {
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = "api/usuarios/PerfilUsuario";
        var url = Global.urlApi + request;

        axios.get(url, { headers })
            .then(response => {
                this.setState({
                    informacion: response.data,
                    statusInformacion: true,
                    idProvincia: response.data.idProvincia,
                    error: null,
                }, () => {
                    this.getProvincia();
                    this.getEmpresaCentro();
                });
            })
            .catch(error => {
                console.error('Error al obtener información del perfil:', error);
                this.setState({
                    error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.',
                });
            });
    }

    getProvincia = () => {
        var request = "api/Provincias/" + this.state.idProvincia;
        var url = Global.urlApi + request;

        axios.get(url)
            .then(response => {
                this.setState({
                    provincia: response.data,
                });
            })
            .catch(error => {
                console.error('Error al obtener Provincia:', error);
            });
    }


    getEmpresaCentro = () => {
        const { idEmpresaCentro } = this.state.informacion;

        if (idEmpresaCentro) {
            var request = "api/EmpresasCentros/" + idEmpresaCentro;
            var url = Global.urlApi + request;

            axios.get(url)
                .then(response => {
                    this.setState({
                        centroUsuario: response.data
                    });
                })
                .catch(error => {
                    console.error('Error al obtener Empresa Centro:', error);
                });
        }
    }


    getTechRidersEmpresa = () => {
        var request = "api/QueryTools/FindTechRidersEnEmpresa/" + this.state.informacion.idEmpresaCentro;
        var url = Global.urlApi + request;

        axios.get(url)
            .then(response => {
                this.setState({
                    techriders: response.data,
                });
            })
            .catch(error => {
                console.error('Error al obtener TechRiders:', error);
            });
    }

    componentDidMount() {
        this.getInformacion();
        console.log(this.state.informacion);

    }

    componentDidUpdate(prevProps, prevState) {
        // Verificar si el estado de la información ha cambiado
        if (prevState.informacion !== this.state.informacion) {
        this.getTechRidersEmpresa();

        }
      }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <h1>Area Personal - Representante</h1>
                    <hr />
                    <div className="container my-4">
                        <div className="container my-4 d-flex justify-content-center align-items-center">
                            <h1 className="text-center mb-0 me-2 ms-2">Información Perfil</h1>
                            <NavLink to="/editarRepresentante" className="btn btn-dark ms-2" role="button">
                            Editar
                        </NavLink>
                        </div>
                        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" placeholder={this.state.informacion.nombre} readOnly />
                                </div>
    
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Apellido</label>
                                    <input type="text" className="form-control" placeholder={this.state.informacion.apellidos} readOnly />
                                </div>
    
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" className="form-control" placeholder={this.state.informacion.email} readOnly />
                                </div>
    
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" placeholder={this.state.informacion.telefono} readOnly />
                                </div>
    
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">LinkedIn</label>
                                    <input type="text" className="form-control" placeholder={this.state.informacion.linkedIn} readOnly />
                                </div>
    
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Provincia</label>
                                    <input type="text" className="form-control" placeholder={this.state.provincia.nombreProvincia} readOnly />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
    
                <div className="container my-2">
                    <h1 className="text-center">Empresa</h1>
                    <br/>
                    {this.state.informacion.idEmpresaCentro ? (
                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.nombre} readOnly />
                    ) : (
                        <input type="text" className="form-control" placeholder="No seleccionado" readOnly />
                    )}
                    <br/>
                </div>
    
                <div className="container my-2">
                    <h1 className="text-center">Datos Empresa</h1>
                    <br/>
                    {this.state.informacion.idEmpresaCentro ? (
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nombre Empresa</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.nombre} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Dirección</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.direccion} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Teléfono</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.telefono} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Persona de Contacto</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.personaContacto} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">CIF</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.cif} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Razón Social</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.razonSocial} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Tipo de Empresa</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.idTipoEmpresa} readOnly />
                                    </div>
    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Estado Empresa</label>
                                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.estadoEmpresa} readOnly />
                                    </div>
                                </div>
                            </form>
                                 ) : (
                                <h6 className="text-center">Selecciona una Empresa para ver sus datos</h6>
                                 )}
                    <br/>
                </div>
    
                <div className="container my-2">
                    <h1 className="text-center">Tech Riders</h1>
                    <br/>
                    {this.state.techriders.length > 0 ? (
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">TechRider</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Direccion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.techriders.map((techRider) => (
                            <tr key={techRider.id}>
                                <td>{techRider.techRider}</td>
                                <td>{techRider.email}</td>
                                <td>{techRider.telefonoTechRider}</td>
                                <td>{techRider.direccion}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    ) : (
                        <h6 className="text-center">No hay Tech Riders asociados a esta empresa</h6>
                    )}
                    <br/>
                </div>
    



                <Footer />
            </div>
        );
    }
}
