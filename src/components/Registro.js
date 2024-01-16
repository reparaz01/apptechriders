import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Navbar from './Navbar';
import Footer from './Footer';


export default class Registro extends Component {
    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaRoles = React.createRef();
    cajaTelefono = React.createRef();
    cajaLinkedin = React.createRef();
    cajaPassword = React.createRef();
    cajarepPassword = React.createRef();
    cajaApellidos = React.createRef();
    cajaProvincia = React.createRef();
    cajaEmpresaCentro = React.createRef();

    state = {
        usuario: {},
        provincia: [],
        Role: [],
        empresacentros: []
    }


    registro = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var email = this.cajaEmail.current.value;
        var telefono = this.cajaTelefono.current.value;
        var linkedin = this.cajaLinkedin.current.value;
        var password = this.cajaPassword.current.value;
        var rol = parseInt(this.cajaRoles.current.value);
        var provincia = parseInt(this.cajaProvincia.current.value);
        var idEmpresaCentro = parseInt(this.cajaEmpresaCentro.current.value) || null;

        var datos = {
            "nombre": nombre,
            "email": email,
            "telefono": telefono,
            "linkedin": linkedin,
            "password": password,
            "idRole": rol,
            "idProvincia": provincia,
            "estado": 1,
            "idEmpresaCentro": idEmpresaCentro
        }

        var request = 'api/usuarios';
        var url = Global.urlApi + request;
        axios.post(url, datos).then(response => {
            this.setState({
                usuario: response.data
            })
        }).catch(error => {
            console.error('Error al realizar la solicitud POST:', error);
            console.log('Detalles del error:', error.response);
            // Otras acciones necesarias
        });
    }

    getProvincias = () => {
        const request = 'api/provincias';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                provincia: response.data
            })
        })
    }

    getEmpresasCentro = () =>{
        const request = 'api/empresascentros';
        const url = Global.urlApi + request;
        axios.get(url).then(response =>{
            this.setState({
                empresacentros: response.data
            })
        })
    }

    componentDidMount = () => {
        this.getProvincias();
        this.getEmpresasCentro()
    }
    componentDidUpdate = () =>{
        this.getEmpresasCentro()
    }

    render() {
        return (
          <div>
            <Navbar />
            <div className="container mt-5">
              <div className="card text-center">
                <div className="card-body">
                  <h2 className="card-title">Registro</h2>
                  <form>
                    <label>Roles:</label>
                    <select name="rol" ref={this.cajaRoles} className="form-control">
                      <option id="1" value="1">Techrider</option>
                      <option id="2" value="2">Profesor</option>
                      <option id="3" value="3">Responsable Empresa</option>
                    </select>
                    <br/>
                    <div className="row">
                      <div className='col-md-6'>
                        <label>Nombre:</label>
                        <input type="text" name="nombre" ref={this.cajaNombre} className="form-control" />
                      </div>
                      <div className='col-md-6'>
                        <label>Apellidos:</label>
                        <input type="text" name="apellidos" ref={this.cajaApellidos} className="form-control" />
                      </div>
                    </div>
                    <br/>
                    <div className="row">
                      <div className='col-md-6'>
                        <label>Email:</label>
                        <input type="email" name="email" ref={this.cajaEmail} className="form-control"/>
                      </div>
                      <div className='col-md-6'>
                        <label>Telefono:</label>
                        <input type="text" name="telefono" ref={this.cajaTelefono} className="form-control"/>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className='col-md-6'>
                        <label>Linkedin:</label>
                        <input type="text" name="linkedin" ref={this.cajaLinkedin} className="form-control"/>
                      </div>
                      <div className='col-md-6'>
                        <label>Contraseña:</label>
                        <input type="password" name="pass" ref={this.cajaPassword} className="form-control"/>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className='col-md-6'>
                        <label>Repetir Contraseña:</label>
                        <input type="password" name="reppass" ref={this.cajarepPassword} className="form-control" />
                      </div>
                      <div className='col-md-6'>
                        <label>Provincia:</label>
                        <select name="provincia" ref={this.cajaProvincia} className="form-control">
                          {           
                            this.state.provincia.map((provincia, index) => {
                              return(<option key={index} value={provincia.idProvincia}>
                                {provincia.nombreProvincia}
                              </option>)
                            })     
                          }
                        </select>
                      </div>
                    </div>
                    <label>Empresa/Centro:</label>
                    <select name="empresacentro" ref={this.cajaEmpresaCentro} className="form-control">
                      <option value={null}>Sin Empresa/Centro</option>
                      {
                        this.state.empresacentros.map((empresacentro, index) => {
                          return (
                            <option key={index} value={empresacentro.idEmpresaCentro}>
                              {empresacentro.nombre}
                            </option>
                          );
                        })
                      }
                    </select>
                    <br/>
                    <button className='btn btn-info' type="submit" onClick={this.registro}>Registrarse</button>
                  </form>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        );
      }
      
}