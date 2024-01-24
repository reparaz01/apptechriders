import React, { Component } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Global from './../Global';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class AreaProfesor extends Component {

    state = {
        informacion: {},
        statusInformacion: false,
        error: null,
        idProvincia: 0,
        provincia: {},
        centroUsuario: {},
        empresascentros: [],
        cursos: []
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
                    this.getCursosProfesor();
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

    getCharlasProfesor = () => {
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


    getCursosProfesor = () => {
        var request = "api/QueryTools/FindCursosProfesor/" + parseInt(localStorage.getItem('idUsuario'));
        var url = Global.urlApi + request;
 
        axios.get(url)
            .then(response => {
                this.setState({
                    cursos: response.data,
                });
            })
            .catch(error => {
                console.error('Error al obtener Cursos:', error);
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

    componentDidMount() {
        this.getInformacion();
        
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <h1>Area Personal - Profesor</h1>
                    <hr />
                    <div className="container my-4">
                      <div className="container my-4 d-flex justify-content-center align-items-center">
                        <h1 className="text-center mb-0 me-2 ms-2">Información Perfil</h1>
                        <NavLink to="/editarProfesor" className="btn btn-dark ms-2" role="button">
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
                    <h1 className="text-center">Centro</h1>
                </div>
                <div className="container my-2">
                    {this.state.informacion.idEmpresaCentro ? (
                        <input type="text" className="form-control" placeholder={this.state.centroUsuario.nombre} readOnly />
                    ) : (
                        <input type="text" className="form-control" placeholder="No seleccionado" readOnly />
                    )}
                </div>
                <div className="container my-2">
                    <h1 className="text-center">Cursos</h1>
                    <br/>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Curso</th>
                                <th scope="col">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cursos.map(curso => (
                                <tr key={curso.idCurso}>
                                    <td>{curso.nombreCurso}</td>
                                    <td>{curso.descripcionCurso}</td>
                                    {/* Puedes añadir más columnas según sea necesario */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="container my-2">
                    <h1 className="text-center">Charlas Solicitadas</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Curso</th>
                                <th scope="col">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cursos.map(curso => (
                                <tr key={curso.idCurso}>
                                    <td>{curso.nombreCurso}</td>
                                    <td>{curso.descripcionCurso}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        );
    }
}
