import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';


export default class Registro extends Component {
    cajaNombre = React.createRef();
    cajaEmail = React.createRef();
    cajaRoles = React.createRef();
    cajaTelefono = React.createRef();
    cajaLinkedin = React.createRef();
    cajaPassword = React.createRef();
    cajaRepPassword = React.createRef();
    cajaApellidos = React.createRef();
    cajaProvincia = React.createRef();

    state = {
        usuario: {},
        provincia: [],
        Role: []
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

        var datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            linkedin: linkedin,
            password: password,
            idRole: rol,
            idProvincia: provincia,
            estado: 1,
        }

        var headers = {
            "content-type": "application/json"
        }

        const request = 'api/usuarios';
        const url = Global.urlApi + request;
        axios.post(url, datos, headers).then(response => {
            this.setState({
                usuario: response.data
            })
        })
    }

    getRoles = () => {
        const headers = {
            Authorization: "Bearer " + Global.token
        }
        const request = 'api/roles';
        const url = Global.urlApi + request;
        axios.get(url, {headers}).then(response =>{
            this.setState({
                Role: response.data
            })
        })
    }

    getProvincias = () => {
        const headers = {
            Authorization: "Bearer " + Global.token
        }
        const request = 'api/provincias';
        const url = Global.urlApi + request;
        axios.get(url, {headers}).then(response =>{
            this.setState({
                provincia: response.data
            })
        })
    }

    componentDidMount = () => {
        this.getRoles();
        this.getProvincias()
    }

    render() {
        return (
            <div className='container'>
                <div className='card text-center'>
                    <div className="card-body">
                        <h2 className='card-title'>Registro</h2>
                        <form>
                            <label>Roles:</label>
                            <select name="rol" ref={this.cajaRoles} className="form-control">
                                {           
                                    this.state.Role.map((Role, index) =>{
                                        return(<option key={index} value={Role.idRole}>
                                            {Role.tipoRole}
                                        </option>)
                                    })     
                                }
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
                                    <label>Contraseña:</label>
                                    <input type="password" name="pass" ref={this.cajaPassword} className="form-control"/>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className='col md-6'>
                                    <label>Repetir Contraseña:</label>
                                    <input type="password" name="reppass" ref={this.cajaPassword} className="form-control" />
                                </div>
                                <div className='col md-6'>
                                    <label>Provincia:</label>
                                    <select name="provincia" ref={this.cajaProvincia} className="form-control">
                                        {           
                                            this.state.provincia.map((provincia, index) =>{
                                                return(<option key={index} value={provincia.idProvincia}>
                                                    {provincia.nombreProvincia}
                                                </option>)
                                            })     
                                        }
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <button className='btn btn-info' type="submit" onClick={this.registro}>Registrarse</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}