import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Global from './Global';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const localizer = momentLocalizer(moment);

class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charlas: [],
      viewDate: new Date(),
      events: [],
      selectedCharla: null,
      dialogOpen: false,
    };
  }

  componentDidMount() {
    this.getCharlas();
  }

  getCharlas = () => {
    var request = "api/charlas";
    var url = Global.urlApi + request;
    axios.get(url).then(response => {
      const charlasFiltradas = response.data.filter(charla => charla.idCurso !== 0);
      this.setState({
        charlas: charlasFiltradas,
      }, () => this.mapCharlasToEvents());
    });
  };

  mapCharlasToEvents() {
    const events = this.state.charlas.map((charla) => {
      let color;
      switch (charla.idEstadoCharla) {
        case 1:
          color = { primary: '#888888', secondary: 'lightgray' };
          break;
        case 2:
          color = { primary: '#ffc400', secondary: 'lightorange' };
          break;
        case 3:
          color = { primary: '#88cfff', secondary: 'lightblue' };
          break;
        case 4:
          color = { primary: '#E74C3C', secondary: 'lightcoral' };
          break;
        case 5:
          color = { primary: '#2ECC71', secondary: 'lightgreen' };
          break;
        case 6:
          color = { primary: '#9B59B6', secondary: 'lightpurple' };
          break;
        default:
          color = { primary: 'black', secondary: 'lightgray' };
          break;
      }

      return {
        title: charla.descripcionCharla,
        start: new Date(charla.fechaCharla),
        end: new Date(charla.fechaCharla),
        charla: charla,
        color: color,
      };
    });

    this.setState({ events });
  }

  dayClicked = (slotInfo) => {
    const charlaSeleccionada = this.state.charlas.find(
      (charla) =>
        new Date(charla.fechaCharla).getDate() === slotInfo.getDate() &&
        new Date(charla.fechaCharla).getMonth() === slotInfo.getMonth() &&
        new Date(charla.fechaCharla).getFullYear() === slotInfo.getFullYear()
    );

    if (charlaSeleccionada) {
      this.setState({ selectedCharla: charlaSeleccionada, dialogOpen: true });
    } else {
      console.log('No hay Charla para esta fecha.');
    }
  };

  eventClicked = (event) => {
    if ('charla' in event) {
      const charlaSeleccionada = event.charla;
      this.setState({ selectedCharla: charlaSeleccionada, dialogOpen: true });
    } else {
      console.log('No hay Charla asociada a este evento.');
    }
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  prevMonth = () => {
    this.setState((prevState) => ({
      viewDate: new Date(
        prevState.viewDate.getFullYear(),
        prevState.viewDate.getMonth() - 1,
        1
      ),
    }), () => this.mapCharlasToEvents());
  };

  nextMonth = () => {
    this.setState((prevState) => ({
      viewDate: new Date(
        prevState.viewDate.getFullYear(),
        prevState.viewDate.getMonth() + 1,
        1
      ),
    }), () => this.mapCharlasToEvents());
  };

  render() {
    return (
      <div style={{ width: '80%', margin: '0 auto', paddingTop: '5%', paddingBottom: '5%', textAlign: 'center' }}>
        <h1>
          <button onClick={this.prevMonth} type="button" className="btn btn-outline-dark">←</button>
          {moment(this.state.viewDate).format('MMMM YYYY')}
          <button onClick={this.nextMonth} type="button" className="btn btn-outline-dark">→</button>
        </h1>

        <hr />
        <Calendar
          localizer={localizer}
          views={['month']}
          events={this.state.events}
          onSelectEvent={this.eventClicked}
          onSelectSlot={this.dayClicked}
        />
        <hr />

        {/* Diálogo para mostrar detalles de la charla */}
        <NavLink to="/detallesCharla">
          Detalles Charla
        </NavLink>
      </div>
    );
  }
}

export default Calendario;
