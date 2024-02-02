import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Navbar from './Navbar';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

export default class RegistrarEmpresaCentro extends Component {
 cajaNombre = React.createRef();
 cajaDireccion = React.createRef();
 cajaPersonaContacto = React.createRef();
 cajaTelefono = React.createRef();
 cajaCif = React.createRef();
 cajaRazonSocial = React.createRef();
 cajaTipo = React.createRef();
 cajaProvincia = React.createRef();
 state = {
     usuario: {},
     provincia: [],
     tipoempresas: [],
     error: null,
     token: localStorage.getItem("token"),
 }
 
 registro = (e) => {
     e.preventDefault();
     var nombre = this.cajaNombre.current.value;
     var direccion = this.cajaDireccion.current.value;
     var personaContacto = this.cajaPersonaContacto.current.value;
     var telefono = this.cajaTelefono.current.value;
     var cif = this.cajaCif.current.value;
     var razonSocial = this.cajaRazonSocial.current.value;
     var tipo = parseInt(this.cajaTipo.current.value);
     var provincia = parseInt(this.cajaProvincia.current.value);
     if (!nombre || !direccion || !personaContacto || !telefono || !cif || !razonSocial || isNaN(tipo) || isNaN(provincia)) {
         // Mostrar mensaje de error en la interfaz de usuario
         this.setState({ error: "Por favor complete todos los campos obligatorios" });
         // Restablecer el estado de error después de 3 segundos (o el tiempo que desees)
         setTimeout(() => {
             this.setState({ error: null });
         }, 3500);
         return;
     }
     var datos = {
         "idEmpresaCentro": 0,
         "nombre": nombre,
         "direccion": direccion,
         "telefono": telefono,
         "personaContacto": personaContacto,
         "cif": cif,
         "razonSocial": razonSocial,
         "idTipoEmpresa": tipo,
         "idProvincia": provincia,
         "estadoEmpresa": 1,
     }
     var request = 'api/empresascentros';
     var url = Global.urlApi + request;
     const headers = { Authorization: `Bearer ${this.state.token}`}
     axios.post(url, datos, { headers }).then(response => {        
         Swal.fire({
             icon: "success",
             title: "Registro Completado",
         });
         window.history.back();
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
 getProvincias = () => {
     const request = 'api/provincias';
     const url = Global.urlApi + request;
     axios.get(url).then(response =>{
         this.setState({
             provincia: response.data
         })
     })
 }
 getTipoEmpresas = () =>{
   const request = 'api/tipoempresa';
     const url = Global.urlApi + request;
     axios.get(url).then(response =>{
         this.setState({
             tipoempresas: response.data
         })
     })
 }

 handleGoBack = () => {
    window.history.back();
  }

 componentDidMount = () => {
     this.getProvincias();
     this.getTipoEmpresas();
     this.MySwal = withReactContent(Swal);
 }
 render() {
   return (
     <div>
       <Navbar />
       <div className='container mt-5 mb-5'>

        <div>
       <NavLink to="/" className="form-label fw-bold" onClick={this.handleGoBack} role="img">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
        </NavLink>
        <br></br> <br></br>
        </div>

         <div className='card text-center'>
             <h2 className='card-header'>Registro de Centro o Empresa</h2>
                 <div className="card-body">
                 {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                     <form>
                         <div className="row">
                             <div className='col md-6'>
                                 <label>Nombre Empresa/Centro:</label>
                                 <input type="text" name="nombre" ref={this.cajaNombre} className="form-control" />
                             </div>
                             <div className='col md-6'>
                                 <label>Direccion:</label>
                                 <input type="text" name="direccion" ref={this.cajaDireccion} className="form-control" />
                             </div>
                         </div>
                         <br/>
                         <div className="row">
                             <div className='col md-6'>
                                 <label>Telefono:</label>
                                 <input type="text" name="telefono" ref={this.cajaTelefono} className="form-control"/>
                             </div>
                             <div className='col md-6'>
                                 <label>Persona Contacto:</label>
                                 <input type="text" name="personaContacto" ref={this.cajaPersonaContacto} className="form-control"/>
                             </div>
                         </div>
                         <br />
                         <div className="row">
                             <div className='col md-6'>
                                 <label>Cif:</label>
                                 <input type="text" name="cif" ref={this.cajaCif} className="form-control"/>
                             </div>
                             <div className='col md-6'>
                                 <label>Razon Social:</label>
                                 <input type="text" name="razonSocial" ref={this.cajaRazonSocial} className="form-control"/>
                             </div>
                         </div>
                         <br />
                         <div className="row">
                             <div className='col md-6'>
                               <label>Tipo:</label>
                               <select name="tipo" ref={this.cajaTipo} className="form-control">
                                   {           
                                       this.state.tipoempresas.map((tipoempresas, index) => {
                                           return(<option key={index} value={tipoempresas.idTipoEmpresa}>
                                               {tipoempresas.descripcion}
                                           </option>)
                                       })     
                                   }
                               </select>
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
                         <br/>
                         <button className='btn btn-dark' type="submit" onClick={this.registro}>Registro Centro/Empresa</button>
                     </form>
                 </div>
             </div>
         </div>
       <Footer />
     </div>
   )
 }
}