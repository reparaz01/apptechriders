import React, { Component } from 'react'
import Global from './../Global';
import axios from 'axios';

export default class Perfil extends Component {

    state = {

        informacion: {},

        statusInformacion: false,

        error: null
    }

    getInformacion = () => {

        var id = parseInt(localStorage.getItem('idUsuario'));

        var token = localStorage.getItem('token');

        var headers = { Authorization: 'Bearer ' + token };

        var request = "api/usuarios/"+id;

        var url = Global.urlApi + request;

        axios.get(url,{ headers }).then(response => {

            this.setState({

                informacion : response.data,

                statusInformacion : true,

                error: null
            });
        })
        .catch(error => {
            
            console.error('Error al obtener información del perfil:', error);
            
            this.setState({
            
                error: 'Error al cargar la información del perfil. Inténtalo de nuevo más tarde.'
            
            });
        });
    }

    componentDidMount () {

        this.getInformacion();
    }


  render() {
    return (
        <div>
            <div className="container my-4">
                <h2 className="text-center mb-4">Informacion Perfil</h2>
                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                <form>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombre </label>
                            <input type="text" className="form-control"  placeholder={this.state.informacion.nombre} readOnly />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Apellido </label>
                            <input type="text" className="form-control"  placeholder={this.state.informacion.apellidos} readOnly />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email </label>
                            <input type="text" className="form-control"  placeholder={this.state.informacion.email} readOnly />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Telefono </label>
                            <input type="text" className="form-control"  placeholder={this.state.informacion.telefono} readOnly />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">LinkedIn </label>
                            <input type="text" className="form-control"  placeholder={this.state.informacion.linkedIn} readOnly />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}
