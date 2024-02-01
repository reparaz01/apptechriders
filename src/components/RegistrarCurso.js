import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
 
export default class RegistrarCurso extends Component {
    cajaIdCentro = React.createRef();
    cajaNombreCurso = React.createRef();
    cajaDescripcion = React.createRef();
   
    state = {
        informacion: {},
        statusInformacion: false,
        error: null,
        centroUsuario: {},
        empresascentros: [],
        idUsuario: localStorage.getItem("idUsuario"),
    }
 
    getCentro = () => {
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = "api/usuarios/PerfilUsuario";
        var url = Global.urlApi + request;
 
        axios.get(url, { headers })
            .then(response => {
                this.setState({
                    informacion: response.data,
                    statusInformacion: true,
                    error: null,
                }, () => {
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
 
    CrearCurso = (e) => {
        e.preventDefault();
        var idCentro = this.state.centroUsuario.idEmpresaCentro;
        var nombreCurso = this.cajaNombreCurso.current.value;
        var descripcion = this.cajaDescripcion.current.value;
 
        if (!nombreCurso || !descripcion) {
            // Mostrar mensaje de error en la interfaz de usuario
            this.setState({ error: "Por favor complete todos los campos obligatorios" });
            // Restablecer el estado de error después de 3 segundos (o el tiempo que desees)
            setTimeout(() => {
                this.setState({ error: null });
            }, 3500);
            return;
        }
        var datos = {
            "idCurso": 0,
            "idCentro": idCentro,
            "nombreCurso": nombreCurso,
            "descripcion": descripcion,
        }
 
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = 'api/cursos';
        var url = Global.urlApi + request;
        axios.post(url, datos, { headers }).then(response => {        
            Swal.fire({
                icon: "success",
                title: "Curso Creado",
            });
            localStorage.setItem('idCurso', response.data.idCurso)
            this.CrearCursoProfesor();
        }).catch(error => {
            // Manejar errores de la solicitud HTTP si es necesario
            console.error("Error en la solicitud HTTP", error);
            // Actualizar el estado de error con un mensaje específico
            this.setState({ error: "Error en la solicitud HTTP" });
            Swal.fire({
                icon: "error",
                title: "Oops...",            
            });
        });
    }
 
    CrearCursoProfesor = () =>{
 
        var datos = {
            "idCurso": localStorage.getItem("idCurso"),
            "idProfesor": this.state.idUsuario,
        }
 
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = `api/cursosprofesores?idcurso=${localStorage.getItem("idCurso")}&idprofesor=${this.state.idUsuario}`;
        var url = Global.urlApi + request;
        axios.post(url, datos, { headers }).then(response => {        
            console.log(response);
        });
    }
 
    componentDidMount() {
        this.getCentro();
        this.MySwal = withReactContent(Swal);
    }
 
  render() {
    return (
        <div>
        <Navbar />
        <div className='container mt-5 mb-5'>
            <NavLink to="/areaProfesor" className="form-label fw-bold" onClick={this.handleGoBack} role="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </NavLink>
          <div className='card text-center'>
              <h2 className='card-header'>Nuevo Curso</h2>
                  <div className="card-body">
                  {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                        <form>
                            <label>Centro:</label>
                            <input type="text" className="form-control" ref={this.cajaIdCentro} placeholder={this.state.centroUsuario.nombre} readOnly />
                            <br />
                            <label>Nombre Curso:</label>
                            <input type="text" name="nombre" ref={this.cajaNombreCurso} className="form-control" />
                            <br />
                            <label>Descripcion:</label>
                            <input type="text" name="descripcion" ref={this.cajaDescripcion} className="form-control" />
                            <br/>
                            <button className='btn btn-dark' type="submit" onClick={this.CrearCurso}>Crear Curso</button>
                      </form>
                  </div>
              </div>
          </div>
        <Footer />
      </div>
    )
  }
}