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
        cursos: [],
        charlas: [],
        charlasProfesor: [],
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
                    this.getCharlasProfesor();
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
        const { cursos } = this.state;
        const request = 'api/charlas';
        const urlTodasCharlas = Global.urlApi + request;
      
        axios
          .get(urlTodasCharlas)
          .then((response) => {
            var todasCharlas = response.data;
         
            // Filtrar charlas del profesor utilizando map
            var charlasProfesor = todasCharlas.filter((charla) =>
              cursos.some((curso) => curso.idCurso === charla.idCurso)
            );
      
            this.setState({
              charlas: todasCharlas,
              charlasProfesor: charlasProfesor,
            });
          })
          .catch((error) => {
            console.error('Error al obtener charlas:', error);
          });
      };

      getEstadoCharla = (idEstadoCharla) => {
        const estadosCharla = [
          { idEstadosCharla: 1, tipo: "CANCELADA" },
          { idEstadosCharla: 2, tipo: "PENDIENTE" },
          { idEstadosCharla: 3, tipo: "PROCESO" },
          { idEstadosCharla: 4, tipo: "CERRADA" },
          { idEstadosCharla: 5, tipo: "COMPLETADA" },
          { idEstadosCharla: 6, tipo: "ACREDITADA" },
        ];
      
        const estado = estadosCharla.find((estado) => estado.idEstadosCharla === idEstadoCharla);
      
        return estado ? estado.tipo : "Desconocido";
      };


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


    getNombreCurso = (idCurso) => {
        const curso = this.state.cursos.find((curso) => curso.idCurso === idCurso);
        return curso ? curso.nombreCurso : "Desconocido";
      };


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

    componentDidUpdate(prevProps, prevState) {
        // Verificar si el estado de la información ha cambiado
        if (prevState.cursos !== this.state.cursos) {
          this.getCharlasProfesor();
          
          /*console.log(this.state.informacion);*/
          // Aquí puedes realizar cualquier otra operación después de la actualización del estado
        }
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
          <h1 className="text-center">
            Mis Charlas &nbsp;
            {/* Puedes ajustar el enlace según sea necesario */}
          </h1>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Curso</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col"> Acciones </th>
              </tr>
            </thead>
            <tbody>
            {this.state.charlasProfesor.map((charla) => (
                <tr key={charla.idCharla}>
                    <td>{charla.descripcion}</td>
                    <td>{this.getNombreCurso(charla.idCurso)}</td>
                    <td>{charla.fechaCharla}</td>
                    <td>{this.getEstadoCharla(charla.idEstadoCharla)}</td>
                    <td>
                    <NavLink
                        to={"/detallesCharla"}
                        className="btn btn-dark"
                        onClick={() => localStorage.setItem('idCharlaSeleccionada', charla.idCharla)}
                        >
                        Detalles
                    </NavLink>
                    </td>

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
