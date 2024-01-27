import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Navbar from '../Navbar';
import Footer from '../Footer';


export default class DetallesCharla extends Component {

  state = {
    charla: {},
    idcharla: localStorage.getItem('idCharlaSeleccionada'), 
    status: false,
    idProvincia : 0,
    idCurso : 0,
    idTechRider : 0,
    provincia: {},
    curso : {},
    techrider : {},
  }

  loadCharlaDetalles = (idcharla) => {
    var request = "api/charlas/" + idcharla;
    var url = Global.urlApi + request;
    axios.get(url).then(response => {
      this.setState({
        charla: response.data,
        idProvincia: response.data.idProvincia,
        idCurso: response.data.idCurso,
        idTechRider: response.data.idTechRider,
        status: true,
      }, () => {
        this.getProvincia();
        this.getCurso();
        this.getTechRider();
    });

    });
  }

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

  getTechRider = () => {
    const { idTechRider } = this.state;
  
    if (idTechRider) {
      var token = localStorage.getItem('token');
      var headers = { Authorization: 'Bearer ' + token };
      var request = "api/Usuarios/" + idTechRider;
      var url = Global.urlApi + request;
  
      axios.get(url, { headers })
        .then(response => {
          this.setState({
            techrider: response.data,
          });
        })
        .catch(error => {
          console.error('Error al obtener Tech Rider:', error);
          // Manejo del error: establecer techrider en un objeto vacío o null
          this.setState({
            techrider: null,
          });
        });
    } else {
      // Si idTechRider es null, establecer techrider en null o un objeto vacío
      this.setState({
        techrider: null,
      });
    }
  }

  getCurso = () => {
    var request = "api/Cursos/" + this.state.idCurso;
    var url = Global.urlApi + request;

    axios.get(url)
        .then(response => {
            this.setState({
                curso: response.data,
            });
        })
        .catch(error => {
            console.error('Error al obtener Cursos:', error);
        });
  }

  componentDidMount = () => {
    this.loadCharlaDetalles(this.state.idcharla); // Cargar detalles usando idcharla del estado
  }

  componentDidUpdate = (oldProps) => {
    // No es necesario comparar oldProps.idCharla y this.props.idCharla aquí
    // ya que estás leyendo el idCharla actualizado del localStorage directamente.
    // Pero puedes agregar la lógica según tus necesidades.
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="dashboard-body">
        <h1 className="mt-2 mb-3">Detalles de la Charla</h1>
          <hr />
          <NavLink to="/areaProfesor" className="form-label fw-bold" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
          </NavLink>
        </div>
        <div className="container my-4">
          {this.state.status && (
            <div className="">
              <h1 className="fw-bold">Charla: {this.state.charla.descripcion}</h1>
              <br></br>
              
              <div className="row">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label fw-bold">Descripción</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.descripcion} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Fecha</label>
                  <input type="text" readOnly className="form-control" value={new Date(this.state.charla.fechaCharla).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Estado</label>
                  <input type="text" readOnly className="form-control" value={this.getEstadoCharla(this.state.charla.idEstadoCharla)} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Provincia</label>
                  <input type="text" readOnly className="form-control"  value={this.state.provincia ? this.state.provincia.nombreProvincia : 'Desconocida'} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Curso</label>
                  <input type="text" readOnly className="form-control" value={this.state.curso.nombreCurso} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Fecha Solicitud</label>
                  <input type="text" readOnly className="form-control" value={new Date(this.state.charla.fechaSolicitud).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Modalidad</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.modalidad} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">TechRider</label>
                  <input type="text" readOnly className="form-control" value={this.state.techrider ? this.state.techrider.nombre : 'No hay Tech Rider'} />
                </div>
                <div className="mt-3">
                  <label className="form-label fw-bold">Observaciones</label>
                  <textarea className="form-control" value={this.state.charla.observaciones} readOnly />
                </div>
              </div>
            </div>
          )}
          {!this.state.charla && (
            <img className="d-block mx-auto" src="./../assets/images/loading.gif" alt="Loading" />
          )}
          <br></br>
          <br></br>
          
        </div>
        <Footer />
      </div>
    )
  }
}
