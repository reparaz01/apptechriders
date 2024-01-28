import React, { Component } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Global from '../Global';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
 
export default class AreaTechRider extends Component {
 
state = {
  informacion: {},
  statusInformacion: false,
  error: null,
  idProvincia: 0,
  provincia: {},
  centroUsuario: {},
  empresascentros: [],
  tecnologias: [],
  charlas: [],
  idUsuario: localStorage.getItem("idUsuario"),
}
getInformacion = () => {
  var token = localStorage.getItem('token');
  var headers = { Authorization: 'Bearer ' + token };
  var request = "api/usuarios/PerfilUsuario";
  var url = Global.urlApi + request;
  axios.get(url, { headers })
    .then(response => {
        this.setState({
            informacion: response.data,
            statusInformacion: true,
            idProvincia: response.data.idProvincia,
            error: null,
        }, () => {
            this.getProvincia();
            this.getEmpresaCentro();
            this.getTecnologiasTechrider();
            this.getCharlasTechrider();
        });
    })
    .catch(error => {
        console.error('Error al obtener información del perfil:', error);
        this.setState({
            error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.',
        });
    });
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
 
getCharlasTechrider = () => {
  const request = 'api/querytools/charlastechrider/' + this.state.idUsuario;
  const urlTodasCharlas = Global.urlApi + request;
  axios.get(urlTodasCharlas).then((response) => {
      var todasCharlas = response.data;
      console.log('Todas las charlas:', todasCharlas);
      this.setState({
        charlas: todasCharlas,
      });
    })
    .catch((error) => {
      console.error('Error al obtener charlas:', error);
    });
};
 
getTecnologiasTechrider = () => {
  var request = `api/QueryTools/FindTecnologiasTechrider?idtechrider=${parseInt(localStorage.getItem('idUsuario'))}`;
  var url = Global.urlApi + request;
  axios.get(url)
    .then(response => {
        this.setState({
            tecnologias: response.data,
        });
    })
    .catch(error => {
        console.error('Error al obtener Tecnologias:', error);
    });
}
 
 
getEmpresaCentro = () => {
  const { idEmpresaCentro } = this.state.informacion;
  if (idEmpresaCentro) {
    var request = "api/EmpresasCentros/" + idEmpresaCentro;
    var url = Global.urlApi + request;
    axios.get(url)
        .then(response => {
            this.setState({
                centroUsuario: response.data
            });
        })
        .catch(error => {
            console.error('Error al obtener Empresa Centro:', error);
        });
  }
}
  componentDidMount() {
    this.getInformacion();
  }
  componentDidUpdate(prevProps, prevState) {
    // Verificar si el estado de la información ha cambiado
    if (prevState.cursos !== this.state.cursos) {
      this.getCharlasTechrider();
     
      /*console.log(this.state.informacion);*/
      // Aquí puedes realizar cualquier otra operación después de la actualización del estado
    }
  }
 
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Area Personal - Techrider</h1>
          <hr />
          <div className="container my-4">
            <div className="container my-4 d-flex justify-content-center align-items-center">
              <h1 className="text-center mb-0 me-2 ms-2">Información Perfil</h1>
              <NavLink to="/editarTechrider" className="btn btn-dark ms-2" role="button">
                  Editar
              </NavLink>
            </div>
            {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
            <form>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" placeholder={this.state.informacion.nombre} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" placeholder={this.state.informacion.apellidos} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" placeholder={this.state.informacion.email} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Teléfono</label>
                        <input type="text" className="form-control" placeholder={this.state.informacion.telefono} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">LinkedIn</label>
                        <input type="text" className="form-control" placeholder={this.state.informacion.linkedIn} readOnly />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Provincia</label>
                        <input type="text" className="form-control" placeholder={this.state.provincia.nombreProvincia} readOnly />
                    </div>
                </div>
            </form>
          </div>
          <h1 className="text-center">Centro</h1>
          <NavLink className="btn btn-success" to={"/crearCurso"}>
              Prueba crearCentro
          </NavLink>
        </div>
        <div className="container my-2">
          {this.state.informacion.idEmpresaCentro ? (
              <input type="text" className="form-control" placeholder={this.state.centroUsuario.nombre} readOnly />
          ) : (
              <input type="text" className="form-control" placeholder="No seleccionado" readOnly />
          )}
        </div>
        <div className="container my-2">
          <h1 className="text-center">
              Mis Tecnologias &nbsp;
              {/* Puedes ajustar el enlace según sea necesario */}
          </h1>
          <NavLink className="btn btn-success" to={"/crearTecno"}>
              Prueba crearTecno
          </NavLink>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id Tecnologia</th>
                <th scope="col">Tecnologia</th>
                <th scope="col">Tipo Tecnologia</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tecnologias.map((tecno) => (
                <tr key={tecno.id}>
                  <td>{tecno.idTecnologia}</td>
                  <td>{tecno.tecnologia}</td>
                  <td>{tecno.tipoTecnologia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container my-2">
          <h1 className="text-center">
              Mis Charlas &nbsp;
              {/* Puedes ajustar el enlace según sea necesario */}
          </h1>
          <NavLink className="btn btn-success" to={"/crearCharlas"}>
              Prueba crearCharla
          </NavLink>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID Charla</th>
                <th scope="col">Descripción Charla</th>
                <th scope="col">Nombre Curso</th>
                <th scope="col">Estado Charla</th>
                <th scope="col">Provincia</th>
                <th scope="col">Modalidad</th>
                <th scope="col">Fecha Charla</th>
              </tr>
            </thead>
            <tbody>
              {this.state.charlas.map((charla) => (
                <tr key={charla.idCharla}>
                <td>{charla.idCharla}</td>
                <td>{charla.descripcionCharla}</td>
                <td>{charla.nombreCurso}</td>
                <td>{charla.estadoCharla}</td>
                <td>{charla.provincia}</td>
                <td>{charla.modalidad}</td>
                <td>{charla.fechaCharla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    )
  }
}