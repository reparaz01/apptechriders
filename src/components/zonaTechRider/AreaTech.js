import React, { Component } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'
import Global from './Global';
export default class AreaTech extends Component {
 state = {
   usuario: {},
   token: localStorage.getItem("token"),
   empresacentros: {},
   idUsuario: localStorage.getItem("idUsuario"),
   idEmpresaCentro: localStorage.getItem("idEmpresaCentro"),
 }
 GetUsuario = () => {
   var request = "api/usuarios/" + this.state.idUsuario;
   var url = Global.urlApi + request;
   const headers = { Authorization: `Bearer ${this.state.token}` };
   axios.get(url, { headers }).then(response => {
     this.setState({
       usuario: response.data,
     });
   });
 };
 getEmpresaCentro = () => { }


 componentDidMount = () =>{
   this.GetUsuario();
   this.getEmpresaCentro()
 }
 render() {
   return (<div> h</div>)

   }
}