import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import charlas from '../assets/images/charlas.jpg';

import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle"; 

class Home extends Component {
  render() {
    return (
      <div id="main" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <section style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
          <h1>Título de Charlas</h1>
          <h2>Subtítulo de Charlas</h2>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>

          </div>

          <img
            src={charlas}
            alt="Charlas"
            className="charlas-image"
            style={{ maxHeight: '50vh', width: '100%', objectFit: 'cover', marginBottom: '0px' }}
          />
          
          <div id="calendario"></div>
        </section>

        <Footer />
      </div>
    );
  }
}

export default Home;
