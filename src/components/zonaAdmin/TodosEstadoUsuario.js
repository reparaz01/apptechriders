//Este componente muestra todas los usuarios con el ESTADO seleccionado en TODOSUSUARIO.
//Si por ejemplo selecciono PENDIEWTE saldra todas los usuario en estado PENDIENTE.

import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class TodosEstadoUsuario extends Component {
  state = {
    usuariosEstado: {}, // Estado para almacenar todos los usuarios del estado
    statusUsuariosEstado: false, // Estado para verificar si los usuarios del estado se han cargado correctamente
    searchTerm: '', // Nuevo estado para el término de búsqueda
    filteredUsuariosEstado: [], // Nuevo estado para almacenar usuarios filtrados
  };

  // Método para obtener usuarios del estado desde la API
  getUsuariosEstado = () => {
    var estado = this.props.idestado;
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/usuarios/usersformatobyestado/' + estado;
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        usuariosEstado: response.data,
        filteredUsuariosEstado: response.data, // Inicialmente, los usuarios filtrados son iguales a todos los usuarios
        statusUsuariosEstado: true,
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
    const { searchTerm, usuariosEstado } = this.state;

    // Filtra los usuarios basándose en el término de búsqueda
    const filteredUsuariosEstado = usuariosEstado.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ filteredUsuariosEstado });
  };

  // Método que se ejecuta al montar el componente, obtiene los usuarios del estado
  componentDidMount() {
    this.getUsuariosEstado();
  }

  render() {
    return (
      <div>
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
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Provincia</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.statusUsuariosEstado === true &&
                  this.state.filteredUsuariosEstado.map((usuario, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>
                          {usuario.nombre} {usuario.apellidos}
                        </td>
                        <td>{usuario.email}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.provincia}</td>
                        <td>{usuario.estado}</td>
                        <td>
                          <NavLink to={'/infoUsuario/' + usuario.idUsuario} className="btn btn-dark">
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
