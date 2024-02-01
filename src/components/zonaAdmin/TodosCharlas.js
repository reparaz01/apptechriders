//Este componente muestra todas las charlas que hay en la BBDD.

import React, { Component, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default class TodosCharla extends Component {
  state = {
    charlas: {},            // Estado para almacenar todas las charlas
    statusCharlas: false,   // Estado para verificar si las charlas se han cargado correctamente
    searchTerm: '',         // Nuevo estado para el término de búsqueda
    filteredCharlas: [],    // Nuevo estado para almacenar charlas filtradas
    selectedOption: '',     // Nuevo estado para almacenar la opción seleccionada en el select
    tipoEstados: {},
    statusTipoEstado: false,
    redirectTo: null // variable para redireccionar
  };

  // Método para obtener los estados de las charlas desde la API
  getEstadosCharlas = () => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/estadoscharlas';
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then(response => {
      this.setState({
        tipoEstados: response.data,
        statusTipoEstado: true
      })
    })
  }

  // Método para obtener las charlas desde la API
  getCharlas = () => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = '/api/QueryTools/CharlasViewAll';
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        charlas: response.data,
        filteredCharlas: response.data, // Inicialmente, las charlas filtradas son iguales a todas las charlas
        statusCharlas: true,
      });
    });
  };

  // Método para manejar cambios en el cuadro de búsqueda.
  handleSearchChange = (event) => {
    // Guarda el valor del search 
    var searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      // Llama a performSearch cada vez que se actualiza el término de búsqueda
      this.performSearch();
    });
  };

  // Método para realizar la búsqueda
  performSearch = () => {
    var { searchTerm, charlas } = this.state;
  
    // Filtra las charlas basándose en el término de búsqueda
    const filteredCharlas = charlas.filter((charla) => {
      const idCharlaString = String(charla.idCharla); // Convierte a cadena
  
      return (
        charla.descripcionCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.fechaSolicitudCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.fechaCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (charla.techRider && charla.techRider.toLowerCase().includes(searchTerm.toLowerCase())) ||
        charla.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        charla.estadoCharla.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idCharlaString.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    this.setState({ filteredCharlas });
  };

  // Método para manejar cambios en el select
  handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({ 
      selectedOption, 
      redirectTo: "/todosEstadoCharla/"+selectedOption 
    })
  };

  // Método que se ejecuta después de que el componente se ha montado
  componentDidMount() {
    this.getCharlas();
    this.getEstadosCharlas();
  }

  render() {
    return (
      <div>
        <div className="dashboard-body">
          <div className="cajas-arriba">
            <div>
              {/* Agregar un select con diferentes opciones */}
              <label>¿Qué tipo de charla buscas? </label>
              <select
                className="form-select"
                id="selectOpciones"
                aria-label="Default select example"
                ref={this.cajaSelect}
                value={this.state.selectedOption}
                onChange={this.handleSelectChange}
              >
                <option>Seleccione una opción</option>
                {this.state.statusTipoEstado === true &&
                  (
                    this.state.tipoEstados.map((estado, index) => {
                      return (
                        <option key={index} value={estado.idEstadosCharla}>{estado.tipo}</option>
                      )
                    })
                  )
                }
              </select>
            </div>
            <div>
              <label>Búsqueda rápida </label>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-1"
                  type="search"
                  placeholder="Escribe aqui..."
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
                  <th>ID</th>
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
                {this.state.statusCharlas === true &&
                  this.state.filteredCharlas.map((charla, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>{charla.idCharla}</td>
                        <td>{charla.descripcionCharla}</td>
                        <td>{charla.fechaSolicitudCharla}</td>
                        <td>{charla.fechaCharla}</td>
                        <td>{charla.techRider}</td>
                        <td>{charla.provincia}</td>
                        <td>{charla.estadoCharla}</td>
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
        {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />} 
      </div>
    );
  }
}

// Método para Redireccionar sin NavLink
const RedirectTo = ({ path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return null;
};
