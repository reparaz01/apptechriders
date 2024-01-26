import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from './Navbar';
import Footer from './Footer';
 
export default class RegistrarTecnologia extends Component {
    cajaNombreTecnologia = React.createRef();
    cajaidTipoTecnologia = React.createRef();
 
    state = {
        error: null,
        token: localStorage.getItem("token"),
        tipotecno: []
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
 
    getTipoTecno = () => {
        const request = 'api/tipotecnologias';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                tipotecno: response.data
            })
        })
    }
 
    componentDidMount = () => {
        this.getTipoTecno();
        this.MySwal = withReactContent(Swal);
    }
 
    render() {
        return (
            <div>
            <Navbar />
            <div className='container mt-5 mb-5'>
              <div className='card text-center'>
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
                                <button className='btn btn-info' type="submit" onClick={this.CrearTecnologia}>Crear Tecnologia</button>
                          </form>
                      </div>
                  </div>
              </div>
            <Footer />
          </div>
        )
    }
}