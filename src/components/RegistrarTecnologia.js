import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
 
export default class RegistrarTecnologia extends Component {
    cajaNombreTecnologia = React.createRef();
    cajaidTipoTecnologia = React.createRef();
    cajaTecnologia = React.createRef();
 
    state = {
        error: null,
        token: localStorage.getItem("token"),
        tipotecno: [],
        tecnologias: [],
        idUsuario: localStorage.getItem("idUsuario"),
    }
 
    CrearTecnologia = (e) => {
        e.preventDefault();
        var nombreTecnologia = this.cajaNombreTecnologia.current.value;
        var idTipoTecnologia = parseInt(this.cajaidTipoTecnologia.current.value);
 
        if (!nombreTecnologia || isNaN(idTipoTecnologia)) {
            // Mostrar mensaje de error en la interfaz de usuario
            this.setState({ error: "Por favor complete todos los campos obligatorios" });
            // Restablecer el estado de error después de 3 segundos (o el tiempo que desees)
            setTimeout(() => {
                this.setState({ error: null });
            }, 3500);
            return;
        }
        var datos = {
            "idTecnologia": 0,
            "nombreTecnologia": nombreTecnologia,
            "idTipoTecnologia": idTipoTecnologia,
        }
 
        var request = 'api/tecnologias';
        var url = Global.urlApi + request;
        const headers = { Authorization: `Bearer ${this.state.token}`}
        axios.post(url, datos, { headers }).then(response => {        
            Swal.fire({
                icon: "success",
                title: "Tecnologia Creada",
            });
            localStorage.setItem('idTecno', response.data.idTecnologia)
            this.CrearTecnologiaTechrider();
        }).catch(error => {
            // Manejar errores de la solicitud HTTP si es necesario
            console.error("Error en la solicitud HTTP", error);
            // Actualizar el estado de error con un mensaje específico
            this.setState({ error: "Error en la solicitud HTTP" });
            Swal.fire({
                icon: "error",
                title: "Oops...",            
            });
        });
    }
 
    CrearTecnologiaTechrider = () =>{
 
        var datos = {
            "idUsuario": this.state.idUsuario,
            "idTecnologia": localStorage.getItem("idTecno"),
        }
 
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = `api/TecnologiasTechRiders?idtechrider=${this.state.idUsuario}&idtecnologia=${localStorage.getItem("idTecno")}`;
        var url = Global.urlApi + request;
        axios.post(url, datos, { headers }).then(response => {        
            console.log(response);
        });
    }

    asignarTecnoTech = () =>{
        var idTecnologia = parseInt(this.cajaTecnologia.current.value);

        var datos = {
            "idUsuario": this.state.idUsuario,
            "idTecnologia": idTecnologia,
        }
 
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = `api/TecnologiasTechRiders?idtechrider=${this.state.idUsuario}&idtecnologia=${idTecnologia}`;
        var url = Global.urlApi + request;
        axios.post(url, datos, { headers }).then(response => {        
            console.log(response)
            alert("Tecnologia asignada");
        });
    }
 
    getTipoTecno = () => {
        const request = 'api/tipotecnologias';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                tipotecno: response.data
            })
        })
    }

    getTecnologias = () => {
        var request = 'api/tecnologias';
        var url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                tecnologias: response.data
            })
        })
    }

 
    componentDidMount = () => {
        this.getTipoTecno();
        this.getTecnologias();
        this.MySwal = withReactContent(Swal);
    }
 
    render() {
        return (
            <div>
            <Navbar />
            <div className='container mt-5 mb-5'>
                <NavLink to="/areaTechRider" className="form-label fw-bold" onClick={this.handleGoBack} role="img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </NavLink>
              <div className='card text-center mb-5'>
                  <h2 className='card-header'>Nueva Tecnologia</h2>
                      <div className="card-body">
                      {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                            <form>
                                <label>Nombre Tecnologia:</label>
                                <input type="text" name="nombre" ref={this.cajaNombreTecnologia} className="form-control" />
                                <br />
                                <label>Tipo Tecnologia:</label>
                                <select name="tipotecno" ref={this.cajaidTipoTecnologia} className="form-control">
                                        {          
                                            this.state.tipotecno.map((tipo, index) => {
                                                return(<option key={index} value={tipo.idTipoTecnologia}>
                                                    {tipo.descripcion}
                                                </option>)
                                            })    
                                        }
                                    </select>
                                <br/>
                                <button className='btn btn-dark' type="submit" onClick={this.CrearTecnologia}>Crear Tecnologia</button>
                          </form>
                      </div>
                  </div>
                  <div className='card text-center mb-5'>
                     <h2 className='card-header'>Asignar Tecnologia</h2>
                      <div className="card-body">
                      {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                            <form>
                                <label>Nombre Tecnologia:</label>
                                <select name="tecnologias" ref={this.cajaTecnologia} className="form-control">
                                    {          
                                        this.state.tecnologias.map((tecnologia, index) => {
                                            return(<option key={index} value={tecnologia.idTecnologia}>
                                                {tecnologia.nombreTecnologia}
                                            </option>)
                                        })    
                                    }
                                </select>
                                <br/>
                                <button className='btn btn-dark' type="submit" onClick={this.asignarTecnoTech}>Asignar Tecnologia</button>
                          </form>
                      </div>
                  </div>
              </div>
            <Footer />
          </div>
        )
    }
}