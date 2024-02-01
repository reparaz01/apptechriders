//Este componente muestra todas las charlas que hay en la BBDD.

import React, { Component, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class Charlas extends Component {
  state = {
    charlas: {},            // Estado para almacenar todas las charlas
    statusCharlas: false,   // Estado para verificar si las charlas se han cargado correctamente
    searchTerm: '',         // Nuevo estado para el término de búsqueda
    filteredCharlas: [],    // Nuevo estado para almacenar charlas filtradas
    redirectTo: null, // variable para redireccionar
    usuario : {},
    statusPutCharlaTech : false,
    statusPutCambioEstadoCharla : false
  };

  getInfoUsuario = () => {
    console.log("Funcion getInfo")
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = "/api/Usuarios/PerfilUsuario";
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        usuario: response.data,
      });
    });
  }

  // Método para obtener las charlas desde la API
  getCharlas = () => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = '/api/Charlas/FindCharlasState/'+2;
    var url = Global.urlApi + request;

    axios.get(url, { headers }).then((response) => {
      this.setState({
        charlas: response.data,
        filteredCharlas: response.data,
        statusCharlas: true,
      });
    });
  };

  putCharlaTech = (idUsuario, idCharla) => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = "/api/Charlas/AsociarTechriderCharla/"+idUsuario+"/"+idCharla;
    var url = Global.urlApi + request;

    axios.put(url,{},{headers}).then((response) => {
      alert("Charla seleccionada ");
      this.setState({
        statusPutCharlaTech: true
      })
      this.putCambioEstadoCharla(idCharla);
    })
  }

  putCambioEstadoCharla = (idCharla) => {
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = "/api/Charlas/UpdateEstadoCharla/"+idCharla+"/"+3; //Cambio a estado Proceso manualmente
    var url = Global.urlApi + request;

    axios.put(url,{},{headers}).then((response) => {
      //alert("Charla " + idCharla + " cambiada a Proceso");
      this.setState({
        statusPutCambioEstadoCharla: true
      })
    })
  }

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
  const { searchTerm, charlas } = this.state;

  // Filtra las charlas basándose en el término de búsqueda
  const filteredCharlas = charlas.filter((charla) => {
    // Asegurarse de que los valores no sean null antes de llamar a toLowerCase
    const descripcion = charla.descripcion ? charla.descripcion.toLowerCase() : '';
    const fechaSolicitud = charla.fechaSolicitud ? charla.fechaSolicitud.toLowerCase() : '';
    const fechaCharla = charla.fechaCharla ? charla.fechaCharla.toLowerCase() : '';
    const turno = charla.turno ? charla.turno.toLowerCase() : '';
    const modalidad = charla.modalidad ? charla.modalidad.toLowerCase() : '';

    return (
      descripcion.includes(searchTerm.toLowerCase()) ||
      fechaSolicitud.includes(searchTerm.toLowerCase()) ||
      fechaCharla.includes(searchTerm.toLowerCase()) ||
      turno.includes(searchTerm.toLowerCase()) ||
      modalidad.includes(searchTerm.toLowerCase())
    );
  });

  this.setState({ filteredCharlas });
};

  // Método que se ejecuta después de que el componente se ha montado
  componentDidMount() {
    this.getCharlas();
    this.getInfoUsuario();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.statusPutCambioEstadoCharla === false && this.state.statusPutCambioEstadoCharla === true) {
      // Llamar a getCharlas cuando statusPutCambioEstadoCharla es true
      this.setState({
        statusPutCambioEstadoCharla : false,
        statusPutCharlaTech: false //Hay que ver porque se repite varias veces el mensaje ()
      })
      this.getCharlas();
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div className="dashboard-body">
          <div className="cajas-arriba">
            <div>

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
              <br></br>
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
                  <th>Turno</th>
                  <th>Modalidad</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.statusCharlas === true &&
                  this.state.filteredCharlas.map((charlas, index) => {
                    return (
                      <tr key={index}>
                        <td> </td>
                        <td>{charlas.descripcion}</td>
                        <td>{charlas.fechaSolicitud}</td>
                        <td>{charlas.fechaCharla}</td>
                        <td>{charlas.turno}</td>
                        <td>{charlas.modalidad}</td>
                        <td>
                        {this.state.usuario.idRole === 3 ? (
                          <>
                          <button className='btn btn-dark' onClick={() => this.putCharlaTech(this.state.usuario.idUsuario,charlas.idCharla)}>
                            Seleccionar 
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          <NavLink to={"/detallesCharla"} className="btn btn-dark" onClick={() => localStorage.setItem('idCharlaSeleccionada', charlas.idCharla)}>
                            Informacion 
                          </NavLink>
                          </>
                        ) : (
                          <NavLink to={"/detallesCharla"} className="btn btn-dark" onClick={() => localStorage.setItem('idCharlaSeleccionada', charlas.idCharla)}>
                            Informacion
                          </NavLink>
                        )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />}
        <Footer /> 
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
