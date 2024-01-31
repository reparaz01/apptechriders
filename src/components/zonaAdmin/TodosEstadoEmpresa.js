import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class TodosEstadoEmpresa extends Component {
  state = {
    empresaEstado: {},          // Estado para almacenar todos los usuarios del estado
    statusEmpresaEstado: false, // Estado para verificar si los usuarios del estado se han cargado correctamente
    searchTerm: '',             // Nuevo estado para el término de búsqueda
    filteredEmpresaEstado: [],  // Nuevo estado para almacenar usuarios filtrados
  };

  // Método para obtener usuarios del estado desde la API
  getEmpresaEstado = () => {
    var estado = this.props.idestado;
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = '/api/EmpresasCentros/EmpresasCentrosFormatoEstado/' + estado;
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        empresaEstado: response.data,
        filteredEmpresaEstado: response.data, // Inicialmente, los usuarios filtrados son iguales a todos los usuarios
        statusEmpresaEstado: true,
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
    var { searchTerm, empresaEstado } = this.state;
    // Filtra los usuarios basándose en el término de búsqueda
    const filteredEmpresaEstado = empresaEstado.filter(
        (empresaEstado) =>
            empresaEstado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empresaEstado.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empresaEstado.personaContacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empresaEstado.tipoEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empresaEstado.descripcionEstado.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredEmpresaEstado });
  };

  // Método que se ejecuta al montar el componente, obtiene los usuarios del estado
  componentDidMount() {
    this.getEmpresaEstado();
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
              <p>¿Quieres volver atrás?</p>
              <NavLink to="/zonaAdmin">
                Atrás
              </NavLink>
            </div>
            <div>
              <label>Búsqueda rápida </label>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-1"
                  type="search"
                  placeholder="Buscar aquí..."
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
                  <th>ID Provincia</th>
                  <th>Persona Contacto</th>
                  <th>Tipo Empresa</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.statusEmpresaEstado === true &&
                  this.state.filteredEmpresaEstado.map((empresa, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>{empresa.nombre} </td>
                        <td>{empresa.provincia}</td>
                        <td>{empresa.personaContacto}</td>
                        <td>{empresa.tipoEmpresa}</td>
                        <td>{empresa.descripcionEstado}</td>
                        <td>
                          <NavLink to={'/infoEmpresa/'+empresa.idEmpresaCentro} className="btn btn-info">
                            Información
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
