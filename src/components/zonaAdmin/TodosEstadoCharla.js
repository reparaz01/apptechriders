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
    charlaEstado: {}, // Estado para almacenar todos los usuarios del estado
    statusCharlaEstado: false, // Estado para verificar si los usuarios del estado se han cargado correctamente
    searchTerm: '', // Nuevo estado para el término de búsqueda
    filteredCharlaEstado: [], // Nuevo estado para almacenar usuarios filtrados
  };

  // Método para obtener usuarios del estado desde la API
  getCharlaEstado = () => {
    var estado = this.props.idestado;
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/charlas/findcharlasstate/' + estado;
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        charlaEstado: response.data,
        filteredCharlaEstado: response.data, // Inicialmente, los usuarios filtrados son iguales a todos los usuarios
        statusCharlaEstado: true,
      });
    });
  };

  // Método para manejar cambios en el cuadro de búsqueda
  handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      // Llama a performSearch cada vez que se actualiza el término de búsqueda
      this.performSearch();
    });
  };

  // Método para realizar la búsqueda
  performSearch = () => {
    const { searchTerm, charlaEstado } = this.state;

    // Filtra los usuarios basándose en el término de búsqueda
    const filteredCharlaEstado = charlaEstado.filter(
      (charla) =>
        charla.descripcionCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.fechaSolicitudCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.fechaCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.techRider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.estadoCharla.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ filteredCharlaEstado });
  };

  // Método que se ejecuta al montar el componente, obtiene los usuarios del estado
  componentDidMount() {
    this.getCharlaEstado();
  }

  render() {
    return (
      <div>
        <div className="header">
          <Navbar />
        </div>
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
                  <th>Descripción</th>
                  <th>Fecha Solicitud</th>
                  <th>Fecha Charla</th>
                  <th>Tech Rider</th>
                  <th>Provincia</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.statusCharlaEstado === true &&
                  this.state.filteredCharlaEstado.map((charla, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>{charla.descripcion}</td>
                        <td>{charla.fechaSolicitud}</td>
                        <td>{charla.fechaCharla}</td>
                        <td>{charla.idTechRider}</td>
                        <td>{charla.idProvincia}</td>
                        <td>{charla.idEstadoCharla}</td>
                        <td>
                          <NavLink to={'#'} className="btn btn-info">
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
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}
