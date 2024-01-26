import React, { Component } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import axios from 'axios'
import Global from '../Global'
import {NavLink} from 'react-router-dom';
 
export default class Charlas extends Component {
  state = {
    charlas: [],
    status: false,
    idRole: localStorage.getItem("tipoUsuario"),
}
 
getCharlas = () => {
  var request = "api/charlas";
  var url = Global.urlApi + request;
  axios.get(url).then(response => {
    // Filtrar las charlas con idCurso diferente de 0
    const charlasFiltradas = response.data.filter(charla => charla.idCurso !== 0);
    this.setState({
      charlas: charlasFiltradas,
      status: true
    });
  });
};
 
componentDidMount = () =>{
  this.getCharlas();
}
  render() {
    return (
      <div>
        <Navbar />
        <h1 className='text-center mt-5'>Charlas</h1>
        <div className='container mt-5 mb-5'>
          {
            this.state.status === true &&
            (
              <table className='table table-dark'>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha Solicitud</th>
                    <th>idcurso</th>
                    <th>Detalles</th>
                    <th>Asignar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.charlas.map((charla, index) => {
                      return(<tr key={index}>
                        <td>{charla.descripcion}</td>
                        <td>{charla.fechaSolicitud}</td>
                        <td>{charla.idCurso}</td>
                        <td>
                          <NavLink className="btn btn-success" to={"/detallesCharla/" + charla.idCharla}>
                            Detalles
                          </NavLink>
                        </td>
                        <td>
                        {this.state.idRole === '3' ? (
                          <button className='btn btn-success' onClick={() => this.handleSelect(charla.idCharla)}>
                            Seleccionar
                          </button>
                        ) : (
                          <button className='btn btn-success' disabled>
                            Seleccionar
                          </button>
                        )}
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            )
          }
        </div>
        <Footer />
      </div>
    )
  }
}