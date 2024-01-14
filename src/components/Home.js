// Home.js

import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import charlas from '../assets/images/charlas.jpg';

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle"; 


class Home extends Component {
  render() {
    return (
      <div id="main" >
      <Navbar />
        

        <section>
        <h1>Título de Charlas</h1>
            <h2>Subtítulo de Charlas</h2>
          <div className="text-center">
  

            <div>
              {/* Tabla con clases de Bootstrap */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Charla</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nombre de la Charla 1</td>
                    <td>Categoría 1</td>
                    <td>
                      <button className="btn btn-primary">Editar</button>
                    </td>
                  </tr>
                  {/* Agrega más filas según sea necesario */}
                </tbody>
              </table>
            </div>
          </div>

          <img src={charlas} alt="Charlas" className="charlas-image" />
        </section>

        <Footer />

        
      </div>
    );
  }
}

export default Home;
