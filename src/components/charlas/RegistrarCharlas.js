import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from '../Navbar';
import Footer from '../Footer';
 
export default class RegistrarCharlas extends Component {
    cajaDescripcion = React.createRef();
    cajaFecha = React.createRef();
    cajaAcreditacionLinkedIn = React.createRef();
    cajaCursos = React.createRef();
    cajaFechaSolicitud = React.createRef();
    cajaModalidad = React.createRef();
    cajaObservaciones = React.createRef();
    cajaProvincia = React.createRef();
    cajaTurno = React.createRef();
 
    state = {
        usuario: {},
        provincia: [],
        error: null,
        cursos: [],
        token: localStorage.getItem("token"),
    }
   
    CrearCharlas = (e) => {
        e.preventDefault();
        var descripcion = this.cajaDescripcion.current.value;
        var fechaCharla = this.cajaFecha.current.value;
        var observaciones = this.cajaObservaciones.current.value;
        var fechaSolicitud = this.cajaFechaSolicitud.current.value;
        var turno = this.cajaTurno.current.value;
        var modalidad = this.cajaModalidad.current.value;
        var acreditacionLinkedIn = this.cajaAcreditacionLinkedIn.current.value;
        var idcurso = parseInt(this.cajaCursos.current.value);
        var provincia = parseInt(this.cajaProvincia.current.value);
 
        if (!descripcion || !fechaCharla || !observaciones || !fechaSolicitud || !turno
        || !modalidad || !acreditacionLinkedIn || isNaN(provincia) || isNaN(idcurso)) {
            // Mostrar mensaje de error en la interfaz de usuario
            this.setState({ error: "Por favor complete todos los campos obligatorios" });
            // Restablecer el estado de error después de 3 segundos (o el tiempo que desees)
            setTimeout(() => {
                this.setState({ error: null });
            }, 3500);
            return;
        }
        var datos = {
            "idCharla": 0,
            "descripcion": descripcion,
            "idEstadoCharla": 2,
            "fechaCharla": fechaCharla,
            "observaciones": observaciones,
            "idTechRider": null,
            "fechaSolicitud": fechaSolicitud,
            "turno": turno,
            "modalidad": modalidad,
            "acreditacionLinkedIn": acreditacionLinkedIn,
            "idProvincia": provincia,
            "idcurso": idcurso,
        }
 
        var request = 'api/charlas';
        var url = Global.urlApi + request;
        const headers = { Authorization: `Bearer ${this.state.token}`}
        axios.post(url, datos, { headers }).then(response => {        
            Swal.fire({
                icon: "success",
                title: "Charla Creada",
            });
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
    getProvincias = () => {
        const request = 'api/provincias';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                provincia: response.data
            })
        })
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
 
    componentDidMount = () => {
        this.getProvincias();
        this.getCursosProfesor();
        this.MySwal = withReactContent(Swal);
    }
    render() {
      return (
        <div>
          <Navbar />
          <div className='container mt-5 mb-5'>
            <div className='card text-center'>
                <h2 className='card-header'>Nueva Charla</h2>
                    <div className="card-body">
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                        <form>
                            <div className="row">
                                <div className='col md-6'>
                                    <label>Descripcion/Nombre:</label>
                                    <input type="text" name="nombre" ref={this.cajaDescripcion} className="form-control" />
                                </div>
                                <div className='col md-6'>
                                    <label>Fecha Charla:</label>
                                    <input type="text" name="fecha" ref={this.cajaFecha} className="form-control" />
                                </div>
                            </div>
                            <br/>
                            <label>Observaciones:</label>
                            <input type="text" name="observaciones" ref={this.cajaObservaciones} className="form-control"/>
                            <br/>
                            <div className="row">
                                <div className='col md-6'>
                                    <label>Fecha Actual:</label>
                                    <input type="text" name="fechasolicitud" ref={this.cajaFechaSolicitud} className="form-control"/>
                                </div>
                                <div className='col md-6'>
                                    <label>Acreditacion LinkedIn:</label>
                                    <input type="text" name="acreditacion" ref={this.cajaAcreditacionLinkedIn} className="form-control"/>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className='col md-6'>
                                    <label>Turno:</label>
                                    <input type="text" name="turno" ref={this.cajaTurno} className="form-control"/>
                                </div>
                                <div className='col md-6'>
                                    <label>Modalidad:</label>
                                    <input type="text" name="modalidad" ref={this.cajaModalidad} className="form-control"/>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className='col md-6'>
                                  <label>Cursos:</label>
                                  <select name="cursos" ref={this.cajaCursos} className="form-control">
                                      {          
                                          this.state.cursos.map((cursos, index) => {
                                              return(<option key={index} value={cursos.idCurso}>
                                                  {cursos.nombreCurso}
                                              </option>)
                                          })    
                                      }
                                  </select>
                                </div>
                                <div className='col md-6'>
                                    <label>Provincia:</label>
                                    <select name="provincia" ref={this.cajaProvincia} className="form-control">
                                        {          
                                            this.state.provincia.map((provincia, index) => {
                                                return(<option key={index} value={provincia.idProvincia}>
                                                    {provincia.nombreProvincia}
                                                </option>)
                                            })    
                                        }
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <button className='btn btn-info' type="submit" onClick={this.CrearCharlas}>Crear Charla</button>
                        </form>
                    </div>
                </div>
            </div>
          <Footer />
        </div>
      )
    }
}