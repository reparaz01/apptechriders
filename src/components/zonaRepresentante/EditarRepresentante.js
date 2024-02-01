import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default class EditarRepresentante extends Component {
  cajaIdUsuario = React.createRef();
  cajaNombre = React.createRef();
  cajaApellido = React.createRef();
  cajaEmail = React.createRef();
  cajaTelf = React.createRef();
  cajaLinkedin = React.createRef();
  cajaPass = React.createRef();
  cajaIdProvincia = React.createRef();
  cajaIdEmpresaCentro = React.createRef();

  cajaNombreEmpresa = React.createRef();
  cajaDireccionEmpresa = React.createRef();
  cajaTelefonoEmpresa = React.createRef();
  cajaPersonaContactoEmpresa = React.createRef();
  cajaCIFEmpresa = React.createRef();
  cajaRazonSocialEmpresa = React.createRef();


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
    var telf = this.cajaTelf.current.value;
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
        window.location.href = "/areaRepresentante";
        this.setState({
          statusPutInformacion: true,
        });
  
        // Llamada a editarEmpresa solo si idEmpresaCentro no es null
        if (this.state.informacion.idEmpresaCentro !== null) {
          this.editarEmpresa();
          console.log("tengo emopr3sa");
        }
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
      });
  };

  editarEmpresa = () => { 
    var token = localStorage.getItem('token');
    var headers = { Authorization: 'Bearer ' + token };
    var request = 'api/EmpresasCentros';
    var url = Global.urlApi + request;
  
    var idEmpresaCentro = this.state.informacion.idEmpresaCentro;
    var nombre = this.cajaNombreEmpresa.current.value;
    var direccion = this.cajaDireccionEmpresa.current.value;
    var telefono = this.cajaTelefonoEmpresa.current.value;
    var personaContacto = this.cajaPersonaContactoEmpresa.current.value;
    var cif = this.cajaCIFEmpresa.current.value;
    var razonSocial = this.cajaRazonSocialEmpresa.current.value;
  
    var idProvincia = this.state.centroUsuario.idProvincia;
    var idTipoEmpresa = this.state.centroUsuario.idTipoEmpresa;
    var estadoEmpresa = this.state.centroUsuario.estadoEmpresa;
  
    var data = {
      idEmpresaCentro: idEmpresaCentro,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      personaContacto: personaContacto,
      cif: cif,
      idProvincia: idProvincia,
      razonSocial: razonSocial,
      idTipoEmpresa: idTipoEmpresa,
      estadoEmpresa: estadoEmpresa
    };
  
    console.log(data);
  
    axios
      .put(url, data, { headers })
      .then((response) => {
        this.setState({
          statusPutInformacion: true,
        });
      })
      .catch((error) => {
        console.error('Error al actualizar empresa:', error);
      });
  };


  componentDidMount() {
    this.getInformacion();
    

  }

  componentDidUpdate(prevProps, prevState) {
    // Verificar si el estado de la información ha cambiado
    if (prevState.cursos !== this.state.cursos) {
      this.getEmpresaCentro();
      
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
          <h1>Area Personal - Representante</h1>
          <hr />
          <NavLink to="/areaRepresentante" className="form-label fw-bold" role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
          </NavLink>
          <div className="container my-4">
            <div className="container my-4 d-flex justify-content-center align-items-center">
              <h1 className="text-center mb-0 me-2 ms-2">Datos Personales  </h1> &nbsp; &nbsp;&nbsp;&nbsp;
              <NavLink to="/areaRepresentante" className="btn btn-dark" role="button" onClick={this.putInformacion}>
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
            <h1 className="text-center">Empresa</h1>
            <br/>
            {this.state.centros.length > 0 ? (
  <select
    className="form-select"
    ref={this.cajaIdEmpresaCentro}
    value={this.state.centroUsuario.idEmpresaCentro || ''}
    onChange={(e) => {
      const selectedValue = e.target.value;
      // Si se selecciona "Ninguna", establece el valor como null
      const newValue = selectedValue === "Ninguna" ? null : selectedValue;
      this.setState({ centroUsuario: { ...this.state.centroUsuario, idEmpresaCentro: newValue } });
    }}
  >
    <option value="">Selecciona una empresa</option>
    {/* Añade una opción "Ninguna" al final */}
    <option value="Ninguna">Ninguna</option>
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
            ¿No está tu centro? <NavLink to='/RegistrarEmpresaCentro' className="nav-link text-primary">Regístralo</NavLink>
            <br/>
          </div>


          <div className="container my-2">
          <h1 className="text-center mb-0 me-2 ms-2">Datos Empresa </h1> &nbsp; &nbsp;&nbsp;&nbsp;
          <br/>
          {this.state.informacion.idEmpresaCentro ? (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre Empresa</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.nombre} ref={this.cajaNombreEmpresa} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.direccion} ref={this.cajaDireccionEmpresa} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.telefono} ref={this.cajaTelefonoEmpresa} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Persona de Contacto</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.personaContacto} ref={this.cajaPersonaContactoEmpresa} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">CIF</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.cif} ref={this.cajaCIFEmpresa} />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Razón Social</label>
                  <input type="text" className="form-control" defaultValue={this.state.centroUsuario.razonSocial} ref={this.cajaRazonSocialEmpresa} />
                </div>
              </div>
            </form>
          ) : (
            <h6 className="text-center">Selecciona una Empresa para ver sus datos</h6>
          )}
          <br/>
        </div>


        </div>
        <Footer />
      </div>
    );
  }
  
}