import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default class Contacto extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <h1> Contacta con Nosotros </h1>
        </div>
        <Footer />
      </div>
    );
  }
}
