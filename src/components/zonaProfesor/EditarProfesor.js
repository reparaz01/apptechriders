import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class EditarProfesor extends Component {
  cajaIdUsuario = React.createRef();
  cajaNombre = React.createRef();
  cajaApellido = React.createRef();
  cajaEmail = React.createRef();
  cajaTelf = React.createRef();
  cajaLinkedin = React.createRef();
  cajaPass = React.createRef();
  cajaIdProvincia = React.createRef();
  cajaIdEmpresaCentro = React.createRef();



  state = {
    statusInformacion: false,
    informacion: {},
    statusPutInformacion: false,
    provincias: [],
    cursos: [],
    centros:[],
    centroUsuario: {},
    charlas: [],
    charlasProfesor: [],
  };

  getInformacion = () => {
    var id = parseInt(localStorage.getItem('idUsuario'));
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/usuarios/' + id;
    var url = Global.urlApi + request;

    axios
      .get(url, { headers })
      .then(response => {
        this.setState({
            informacion: response.data,
            statusInformacion: true,
        }, () => {
            this.getProvincias();
            this.getEmpresaCentro();
            this.getEmpresasCentro();
            this.getCursosProfesor();
            this.getCharlasProfesor();
        });
    })
      .catch((error) => {
        console.error('Error al obtener información del perfil:', error);
        this.setState({
          error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.',
        });
      });



  };

  getProvincias = () => {
    var request = 'api/Provincias';
    var url = Global.urlApi + request;

    axios
      .get(url)
      .then((response) => {
        this.setState({
          provincias: response.data,
        });
      })
      .catch((error) => {
        console.error('Error al obtener provincias:', error);
      });
  };


  getCursosProfesor = () => {
    var request = "api/QueryTools/FindCursosProfesor/" + parseInt(localStorage.getItem('idUsuario'));
    var url = Global.urlApi + request;

    axios.get(url)
        .then(response => {
            this.setState({
                cursos: response.data,
            });
        })
        .catch(error => {
            console.error('Error al obtener Cursos:', error);
        });
 }

 getCharlasProfesor = () => {
  const { cursos } = this.state;
  const request = 'api/charlas';
  const urlTodasCharlas = Global.urlApi + request;

  axios
    .get(urlTodasCharlas)
    .then((response) => {
      var todasCharlas = response.data;

      console.log('Todas las charlas:', todasCharlas);
      console.log('Cursos del profesor:', cursos);

      // Filtrar charlas del profesor utilizando map
      var charlasProfesor = todasCharlas.filter((charla) =>
        cursos.some((curso) => curso.idCurso === charla.idCurso)
      );

      console.log('Charlas del profesor:', charlasProfesor);

      this.setState({
        charlas: todasCharlas,
        charlasProfesor: charlasProfesor,
      });
    })
    .catch((error) => {
      console.error('Error al obtener charlas:', error);
    });
};





  getEmpresaCentro = () => {
    const { idEmpresaCentro } = this.state.informacion;

    if (idEmpresaCentro) {
        var request = "api/EmpresasCentros/" + this.state.informacion.idEmpresaCentro;
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
  getEmpresasCentro = () => {

        var request = "api/EmpresasCentros/"
        var url = Global.urlApi + request;

        axios.get(url)
            .then(response => {
                this.setState({
                    centros: response.data
                });
            })
            .catch(error => {
                console.error('Error al obtener Empresa Centro:', error);
            });
    
  }


  putInformacion = (e) => {
    e.preventDefault();
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/Usuarios';
    var url = Global.urlApi + request;
    var idUsuario = this.state.informacion.idUsuario;
    var nombre = this.cajaNombre.current.value;
    var apellido = this.cajaApellido.current.value;
    var email = this.cajaEmail.current.value;
    var telf = this.state.informacion.telefono;
    var linkedin = this.cajaLinkedin.current.value;
    var pass = this.cajaPass.current.value;
    var idRole = this.state.informacion.idRole;

    var idProvincia = parseInt(this.cajaIdProvincia.current.value, 10);
    var idEmpresaCentro = parseInt(this.cajaIdEmpresaCentro.current.value, 10);
    var estado = this.state.informacion.estado;

    var data = {
      idUsuario: idUsuario,
      nombre: nombre,
      apellidos: apellido,
      email: email,
      telefono: telf,
      linkedIn: linkedin,
      password: pass,
      idRole: idRole,
      idProvincia: idProvincia,
      idEmpresaCentro: idEmpresaCentro,
      estado: estado,
    };


    axios
      .put(url, data, { headers })
      .then((response) => {
        alert('Usuario actualizado');
        window.location.href = "/areaProfesor";
        this.setState({
          statusPutInformacion: true,
        });
      })

      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
      });
  };

  componentDidMount() {
    this.getInformacion();
    

  }

  componentDidUpdate(prevProps, prevState) {
    // Verificar si el estado de la información ha cambiado
    if (prevState.cursos !== this.state.cursos) {
      this.getCharlasProfesor();
      
      /*console.log(this.state.informacion);*/
      // Aquí puedes realizar cualquier otra operación después de la actualización del estado
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="header">
          <Navbar />
        </div>
        <div className="dashboard-body">
          <h1>Area Personal - Profesor</h1>
          <hr />
          <div className="container my-4">
            <NavLink to="/areaProfesor" className="form-label fw-bold" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </NavLink>
            <div className="container my-4 d-flex justify-content-center align-items-center">
              <h1 className="text-center mb-0 me-2 ms-2">Datos Personales  </h1> &nbsp; &nbsp;&nbsp;&nbsp;
              <NavLink to="/areaProfesor" className="btn btn-primary" role="button" onClick={this.putInformacion}>
                Guardar Cambios
              </NavLink>
            </div>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre &emsp;&emsp;&nbsp;&nbsp;&nbsp;
                  &emsp;&emsp;&emsp;&emsp;
                  &emsp;&emsp;&emsp;&emsp;
                  &emsp;&emsp;&emsp;&emsp; Apellido</label>
                  <div className="d-flex">
                    <input type="text" className="form-control" defaultValue={this.state.informacion.nombre} ref={this.cajaNombre} />
                    <input type="text" className="form-control ms-2" defaultValue={this.state.informacion.apellidos} ref={this.cajaApellido} />
                  </div>
                </div>
  
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefono </label>
                  <input type="text" className="form-control" defaultValue={this.state.informacion.telefono} ref={this.cajaTelf} />
                </div>
  
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email </label>
                  <input type="text" className="form-control" defaultValue={this.state.informacion.email} ref={this.cajaEmail} />
                </div>
  
                <div className="col-md-6 mb-3">
                  <label className="form-label">LinkedIn </label>
                  <input type="text" className="form-control" defaultValue={this.state.informacion.linkedIn} ref={this.cajaLinkedin} />
                </div>
  
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password </label>
                  <input type="text" className="form-control" defaultValue={this.state.informacion.password} ref={this.cajaPass} />
                </div>
  
                <div className="col-md-6 mb-3">
                  <label className="form-label">Provincia</label>
                  <select
                    className="form-select"
                    ref={this.cajaIdProvincia}
                    value={this.state.informacion.idProvincia}
                    onChange={(e) => this.setState({ informacion: { ...this.state.informacion, idProvincia: e.target.value } })}
                  >
                    {this.state.provincias.map((provincia) => (
                      <option key={provincia.idProvincia} value={provincia.idProvincia}>
                        {provincia.nombreProvincia}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Agregar otros campos según sea necesario */}
              </div>
            </form>
          </div>
          
          <div className="container my-2">
            <h1 className="text-center">Centro</h1>
            <br/>
            {this.state.centros.length > 0 ? (
              <select
                className="form-select"
                ref={this.cajaIdEmpresaCentro}
                value={this.state.centroUsuario.idEmpresaCentro || ''}
                onChange={(e) => this.setState({ centroUsuario: { ...this.state.centroUsuario, idEmpresaCentro: e.target.value } })}
              >
                {this.state.centros.map((centro) => (
                  <option key={centro.idEmpresaCentro} value={centro.idEmpresaCentro}>
                    {centro.nombre}
                  </option>
                ))}
              </select>
            ) : (
              <input type="text" className="form-control" placeholder="No seleccionado" readOnly />
            )}
          </div>
          <div id="registrolHelp" className="form-text font-weight-bold text-center mt-2" style={{ fontSize: '18px' }}>
            ¿No está tu centro? <NavLink to='/registro' className="nav-link text-primary">Regístralo</NavLink>
            <br/>
          </div>



        <div className="container my-2">
          <h1 className="text-center">
            Cursos &nbsp; 
            <NavLink to="/crearCurso" className="form-label fw-bold" role="img">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
            </NavLink>
          </h1>
          <br/>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Curso</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cursos.map((curso) => (
                <tr key={curso.idCurso}>
                  <td>{curso.nombreCurso}</td>
                  <td>{curso.descripcionCurso}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => this.handleEliminarCurso(curso.idCurso)}>
                      Eliminar
                    </button>
                  </td>
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
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">ID Curso</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.charlasProfesor.map((charla) => (
                <tr key={charla.idCharla}>
                  <td>{charla.descripcion}</td>
                  <td>{charla.idCurso}</td>
                  <td>{charla.fechaCharla}</td>
                  <td>
                    {/* Agrega aquí el botón de eliminar y su lógica */}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleEliminarCharla(charla.idCharla)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        </div>
        <Footer />
      </div>
    );
  }
  
}
