//Este componente muestra todas las charlas con el ESTADO seleccionado en TODOSCHARLAS.
//Si por ejemplo selecciono PENDIEWTE saldra todas las charlas en estado PENDIENTE.

import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class TodosCHarlaUsuario extends Component {
  state = {
    charlaEstado: {}, 
    statusCharlaEstado: false, 
    searchTerm: '', 
    filteredCharlaEstado: [], 
  };

  getCharlaEstado = () => {
    var estado = this.props.idestado;
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/charlas/findcharlasstate/' + estado;
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        charlaEstado: response.data,
        filteredCharlaEstado: response.data, 
        statusCharlaEstado: true,
      });
    });
  };

  
  handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      
      this.performSearch();
    });
  };


  performSearch = () => {
    const { searchTerm, charlaEstado } = this.state;

    const filteredCharlaEstado = charlaEstado.filter((charla) => {

      const descripcion = (charla.descripcion || '').toString().toLowerCase();
      const fechaSolicitud = (charla.fechaSolicitud || '').toString().toLowerCase();
      const fechaCharla = (charla.fechaCharla || '').toString().toLowerCase();
      const turno = (charla.turno || '').toString().toLowerCase();
      const modalidad = (charla.modalidad || '').toString().toLowerCase();
      const idCharla = (charla.idCharla || '').toString().toLowerCase();

      return (
        descripcion.includes(searchTerm.toLowerCase()) ||
        fechaSolicitud.includes(searchTerm.toLowerCase()) ||
        fechaCharla.includes(searchTerm.toLowerCase()) ||
        turno.includes(searchTerm.toLowerCase()) ||
        modalidad.includes(searchTerm.toLowerCase()) ||
        idCharla.includes(searchTerm.toLowerCase())
      );
  });

  this.setState({ filteredCharlaEstado });
};


  
  componentDidMount() {
    this.getCharlaEstado();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="container my-4">
          <div className="cajas-arriba">
            <div>
                <p>¿Quieres volver atras?</p>
                <NavLink to="/zonaAdmin">
                  Atras
                </NavLink>
            </div>
            <div>
              <label>Búsqueda rápida </label>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-1"
                  type="search"
                  placeholder="Buscar aqui..."
                  aria-label="Search"
                  value={this.state.searchTerm}
                  onChange={this.handleSearchChange}
                />
              </form>
            </div>
          </div>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Descripción</th>
                  <th>Fecha Solicitud</th>
                  <th>Fecha Charla</th>
                  <th>Turno</th>
                  <th>Modalidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.statusCharlaEstado === true &&
                  this.state.filteredCharlaEstado.map((charla, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>{charla.idCharla}</td>
                        <td>{charla.descripcion}</td>
                        <td>{charla.fechaSolicitud}</td>
                        <td>{charla.fechaCharla}</td>
                        <td>{charla.turno}</td>
                        <td>{charla.modalidad}</td>
                        <td>
                          <NavLink to={"/detallesCharla"} className="btn btn-dark" onClick={() => localStorage.setItem('idCharlaSeleccionada', charla.idCharla)}>
                            Informacion
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
