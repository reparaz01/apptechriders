import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class DetallesCharla extends Component {

  state = {
    charla: {},
    idcharla: localStorage.getItem('idCharlaSeleccionada'), 
    status: false,
  }

  loadCharlaDetalles = (idcharla) => {
    var request = "api/charlas/" + idcharla;
    var url = Global.urlApi + request;
    console.log(url)
    axios.get(url).then(response => {
      this.setState({
        charla: response.data,
        status: true,
      });
    });
  }

  componentDidMount = () => {
    console.log(this.state.idcharla);
    this.loadCharlaDetalles(this.state.idcharla); // Cargar detalles usando idcharla del estado
  }

  componentDidUpdate = (oldProps) => {
    // No es necesario comparar oldProps.idCharla y this.props.idCharla aquí
    // ya que estás leyendo el idCharla actualizado del localStorage directamente.
    // Pero puedes agregar la lógica según tus necesidades.
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container mb-5 mt-5'>
          {this.state.status && (
            <div className="shadow-card p-4 mb-3">
              <h1 className="fw-bold">Charla {this.state.charla.idCharla}</h1>
              <hr className="border border-dark opacity-50" />
              <div className="row">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label fw-bold">Descripción</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.descripcion} />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Fecha Charla</label>
                  <input type="text" readOnly className="form-control" value={new Date(this.state.charla.fechaCharla).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Estado</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.idEstadoCharla} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Provincia</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.idProvincia} />
                </div>
                <div className="col-md-6 mt-3">
                  <label className="form-label fw-bold">Curso</label>
                  <input type="text" readOnly className="form-control" value={this.state.charla.idCurso} />
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
                  <input type="text" readOnly className="form-control" value={this.state.charla.idTechRider} />
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
        </div>
        <Footer />
      </div>
    )
  }
}
