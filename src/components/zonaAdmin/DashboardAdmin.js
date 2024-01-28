// DashboardAdmin.js
import React, { Component } from 'react';
import Navbar from './../Navbar';
import Footer from './../Footer';
import SidebarAdmin from './SidebarAdmin';
import './../../styles/zonaAdmin.css';
//import Perfil from './Perfil';
import InfoAdmin from './InfoAdmin';
//import Usuarios from './Usuarios';
import Todosusuarios from './TodosUsuarios';
import TodosCharlas from './TodosCharlas';
import TodosEmpresas from './TodosEmpresas';

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponent: null,
    };
  }

  handleComponentChange = (component) => {
    this.setState({ selectedComponent: component });
  };

  render() {
    const { selectedComponent } = this.state;

    return (
      <div className="dashboard-admin">
        <div className="header">
          <Navbar />
        </div>
        <div className="main-content">
          <div className="sidebar">
            <SidebarAdmin onComponentChange={this.handleComponentChange} />
          </div>
          <div className="dashboard-body">
            {/* Renderizar el componente seleccionado */}
            {selectedComponent === 'InfoAdmin' && <InfoAdmin />}
            {selectedComponent === 'TodosUsuarios' && <Todosusuarios />}
            {selectedComponent === 'TodosCharlas' && <TodosCharlas />}
            {selectedComponent === 'TodosEmpresas' && <TodosEmpresas />}
            {/* Agrega más componentes según sea necesario */}
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default DashboardAdmin;
