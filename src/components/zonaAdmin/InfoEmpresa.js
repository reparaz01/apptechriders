import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { NavLink } from 'react-router-dom';

export default class InfoEmpresa extends Component {

  state = {
    idEmpresa: this.props.idempresa,
    empresa : {},
    statusEmpresa : false,
    error : null,
    empresaResponsables: [],
    statusEmpresaResponsable : false,
    mostrarResponsables: false,
  }

  getInfoEmpresa = () => {
    var idEmpresa = this.props.idempresa;
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = "/api/EmpresasCentros/"+idEmpresa;
    var url = Global.urlApi + request;
    axios.get(url,{ headers }).then(response => {
      this.setState({
        empresa : response.data,
        statusEmpresa : true,
        error: null
      });
    })
    .catch(error => {        
      console.error('Error al obtener información de la empresa :', error);      
      this.setState({      
        error: 'Error al cargar la información la empresa. Inténtalo de nuevo más tarde.'    
      });
    });
  }

  getResponsablesEmpresa = () => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = "api/QueryTools/FindTechRidersEnEmpresa/"+this.props.idempresa;
    var url = Global.urlApi + request;
    axios.get(url,{ headers }).then(response => {
      this.setState({
        empresaResponsables : response.data,
        statusEmpresaResponsable : true,
        error: null
      });
    })
    .catch(error => {        
      console.error('Error al obtener información de la empresa con sus responsables :', error);      
      this.setState({      
        error: 'Error al cargar la información la empresa con sus responsables. Inténtalo de nuevo más tarde.'    
      });
    });
  }

    // Función para mostrar/ocultar el div de responsables
  toggleResponsables = () => {
    this.setState((prevState) => ({
      mostrarResponsables: !prevState.mostrarResponsables,
    }));
    this.getResponsablesEmpresa();
  };

  componentDidMount (){
    this.getInfoEmpresa();
  }

  render() {

    if(this.state.statusEmpresa === true)
    {
      return (
        <div>
              <Navbar />
              <div className="dashboard-body">
                  <div className="container my-4">
                    {/* De momento dejamso aqui un link para ir atras */}
                  <p>¿Quieres volver atras?</p>
                  <NavLink to="/zonaAdmin">
                    Atras
                  </NavLink>
                      <h2 className="text-center mb-4">Informacion Empresa</h2>
                      <form>
                          <div className="row">
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Id Empresa/Centro </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.idEmpresaCentro} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Nombre </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.nombre} disabled/>
                              </div>
                              
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Direccion </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.direccion} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Telefono </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.telefono} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Persona Contacto </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.personaContacto} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">CIF </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.cif} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Id Provincia </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.idProvincia} disabled/>
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Razon Social </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.razonSocial} disabled />
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Id Tipo Empresa </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.idTipoEmpresa} disabled />
                              </div>
  
                              <div className="col-md-6 mb-3">
                                  <label className="form-label">Estado Empresa </label>
                                  <input type="text" className="form-control" defaultValue={this.state.empresa.estadoEmpresa} disabled />
                              </div>
                          </div>
                      </form>
                      {this.state.empresa.idTipoEmpresa === 1 && (
                        <button className="btn btn-dark" onClick={this.toggleResponsables}>
                          Mostrar Responsables
                        </button>
                      )}
                      {this.state.mostrarResponsables === true && (
                        <div>
                          <table className="table">
                            <thead className="table-light">
                                <tr>
                                  <th>Representante / TechRider</th>
                                  <th>Email</th>
                                  <th>Telefono</th>
                                  <th>Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.empresaResponsables.map((responsables,index) => { 
                                        return (
                                            <tr key={index}>
                                                <td>{responsables.techRider}</td>
                                                <td>{responsables.email}</td>
                                                <td>{responsables.telefonoTechRider}</td>
                                                <td>{responsables.direccion}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                          </table>
                        </div>
                      )}
                  </div>
              </div>
              <Footer />
        </div>
      )
    }
    }
}
