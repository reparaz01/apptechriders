//Este componente muestra todas los usuarios que hay en la BBDD.

import React, { Component, useEffect } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default class TodosUsuarios extends Component {
    // State. Zona de valores y cambios.
    state = {
        usuarios: {}, // Estado para almacenar todos los usuarios
        statusUsuarios: false, // Estado para verificar si los usuarios se han cargado correctamente
        searchTerm: '', // Nuevo estado para el término de búsqueda
        filteredUsuarios: [], // Nuevo estado para almacenar usuarios filtrados
        estadoUsuarios : {},
        statusEstadoUsuarios: false,
        redirectTo: null // variable para redireccionar
    };

    getEstadoUsuario =() => {
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = 'api/estadosvalidacion';
        var url = Global.urlApi + request;

        axios.get(url, { headers }).then(response => {
        this.setState({
            estadoUsuarios: response.data,
            statusEstadoUsuarios: true
        })
        })
    }

    // Método para buscar y guardar todos los usuarios.
    getUsuarios = () => {
        var token = localStorage.getItem('token');
        var headers = { Authorization: 'Bearer ' + token };
        var request = 'api/Usuarios/UsersFormato';
        var url = Global.urlApi + request;

        axios.get(url, { headers }).then((response) => {
            this.setState({
                usuarios: response.data,
                filteredUsuarios: response.data, // Inicialmente, los usuarios filtrados son iguales a todos los usuarios
                statusUsuarios: true,
            });
        });
    };

    // Método para manejar cambios en el cuadro de búsqueda.
    handleSearchChange = (event) => {
        // Guarda el valor del search 
        var searchTerm = event.target.value;
        this.setState({ searchTerm }, () => {
            // Llama a performSearch cada vez que se actualiza el término de búsqueda
            this.performSearch();
        });
    };

    // Método para realizar la búsqueda
    performSearch = () => {
        var { searchTerm, usuarios } = this.state;

        // Filtra los usuarios basándose en el término de búsqueda
        const filteredUsuarios = usuarios.filter(
            (usuario) =>
                usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.telefono.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.estado.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ filteredUsuarios });
    };

    // Método para manejar cambios en el select
    handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        this.setState({ 
        selectedOption, 
        redirectTo: "/todosEstadoUsuarios/"+selectedOption 
        })
    };

    componentDidMount() {
        this.getUsuarios();
        this.getEstadoUsuario();
    }

    render() {
        return (
            <div>
                <div className="dashboard-body">
                    <div className="cajas-arriba">
                        <div>
                            {/* Agregar un select con diferentes opciones */}
                            <label>¿Qué tipo de Usuario buscas? </label>
                            <select
                                className="form-select"
                                id="selectOpciones"
                                aria-label="Default select example"
                                ref={this.cajaSelect}
                                value={this.state.selectedOption}
                                onChange={this.handleSelectChange}
                                defaultValue={"Seleccione una opcion"}
                                >
                                <option>Seleccione una opción</option>
                                {this.state.statusEstadoUsuarios === true &&
                                    (
                                    this.state.estadoUsuarios.map((estado, index) => {
                                        return (
                                        <option key={index} value={estado.idEstadoValidacion}>{estado.nombreEstado}</option>
                                        )
                                    })
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label>Búsqueda rápida </label>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-1"
                                    type="search"
                                    placeholder="Escribe aqui..."
                                    aria-label="Search"
                                    value={this.state.searchTerm}
                                    onChange={this.handleSearchChange}
                                />
                            </form>
                        </div>
                    </div>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <table className="table">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Telefono</th>
                                    <th>Provincia</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.statusUsuarios === true &&
                                    this.state.filteredUsuarios.map((usuario, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> </td>
                                                <td>
                                                    {usuario.nombre} {usuario.apellidos}
                                                </td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.telefono}</td>
                                                <td>{usuario.provincia}</td>
                                                <td>{usuario.estado}</td>
                                                <td>
                                                    <NavLink to={'/infoUsuario/' + usuario.idUsuario} className="btn btn-dark">
                                                        Informacion
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                    {this.state.redirectTo && <RedirectTo path={this.state.redirectTo} />} 
                </div>
            </div>
        );
    }
}

// Método para Redireccionar sin NavLink
const RedirectTo = ({ path }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      navigate(path);
    }, [navigate, path]);
  
    return null;
};