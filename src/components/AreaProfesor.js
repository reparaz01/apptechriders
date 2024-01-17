import React, { Component } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

export default class AreaAdmin extends Component {
  render() {
    return (
      <div>
          <Navbar />
            <h1>Area Profesor/Representante</h1>
          <Footer />
      </div>
    )
  }
}
