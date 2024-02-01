import React, { Component } from 'react';
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default class Registro extends Component {
    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaRoles = React.createRef();
    cajaTelefono = React.createRef();
    cajaLinkedin = React.createRef();
    cajaPassword = React.createRef();
    cajaApellidos = React.createRef();
    cajaProvincia = React.createRef();

    state = {
        usuario: {},
        provincia: [],
        Role: [],
        empresacentros: [],
        MySwal:{},
        status: false
    }


    registro = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var apellidos = this.cajaApellidos.current.value;
        var email = this.cajaEmail.current.value;
        var telefono = this.cajaTelefono.current.value;
        var linkedin = this.cajaLinkedin.current.value;
        var password = this.cajaPassword.current.value;
        var rol = parseInt(this.cajaRoles.current.value);
        var provincia = parseInt(this.cajaProvincia.current.value);

        var datos = {
            "idUsuario":0,
            "apellidos": apellidos,
            "nombre": nombre,
            "email": email,
            "telefono": telefono,
            "linkedin": linkedin,
            "password": password,
            "idRole": rol,
            "idProvincia": provincia,
            "estado": 0,
            "idEmpresaCentro" : null
        }

        var headers = {
            "content-type": "application/json"
        }

        const request = 'api/usuarios';
        const url = Global.urlApi + request;
        axios.post(url, datos, headers).then(response => {  
            this.AlertOnRegister(response.status);
            this.setState({
                status: true
            })
        }).catch(error=>{
            this.AlertOnRegister(error.status);
        })
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

    AlertOnRegister(status){
        if(status === 200){        
            Swal.fire({
                icon: "success",
                title: "Registro Completado",

            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",             
            });
        }
    }

    componentDidMount = () => {
        this.getProvincias();
        this.getEmpresasCentro();
        this.MySwal = withReactContent(Swal);
    }
   

    render() {
        if(this.state.status === true){
            return (<Navigate to="/"/>)
        }else{
            return (
              <div>
                <Navbar />
                  <div className="container mt-5 mb-5">
                    <div className='card text-center'>
                        <div className="card-body">
                            <h2 className='card-title'>Registro</h2>
                            <form>
                                <label>Roles:</label>
                                <select name="rol" ref={this.cajaRoles} className="form-control">
                                    <option id="1" value="2">PROFESOR</option>
                                    <option id="2" value="3">TECHRIDER</option>
                                    <option id="3" value="4">RESPONSABLE</option>
                                </select>
                                <br/>
                                <div className="row">
                                    <div className='col md-6'>
                                        <label>Nombre:</label>
                                        <input type="text" name="nombre" ref={this.cajaNombre} className="form-control" />
                                    </div>
                                    <div className='col md-6'>
                                        <label>Apellidos:</label>
                                        <input type="text" name="apellidos" ref={this.cajaApellidos} className="form-control" />
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className='col md-6'>
                                        <label>Email:</label>
                                        <input type="email" name="email" ref={this.cajaEmail} className="form-control"/>
                                    </div>
                                    <div className='col md-6'>
                                        <label>Telefono:</label>
                                        <input type="text" name="telefono" ref={this.cajaTelefono} className="form-control"/>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className='col md-6'>
                                        <label>Linkedin:</label>
                                        <input type="text" name="linkedin" ref={this.cajaLinkedin} className="form-control"/>
                                    </div>
                                    <div className='col md-6'>
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
                                <br />
                                <div className="row">
                                    <div className='col md-6'>
                                        <label>Contraseña:</label>
                                        <input type="password" name="pass" ref={this.cajaPassword} className="form-control"/>
                                    </div>
                                    <div className='col md-6'>
                                        <label>Repetir Contraseña:</label>
                                        <input type="password" name="reppass" className="form-control" />
                                    </div>
                                </div>
                                <br/>
                                <button className='btn btn-dark btn-block' type="submit" onClick={this.registro}>&nbsp;&nbsp;  Registrarse &nbsp;&nbsp;</button>
                            </form>
                        </div>
                    </div>
                  </div>
                <Footer />
              </div>
            );
        }
    }
}