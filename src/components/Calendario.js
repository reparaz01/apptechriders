import React, { Component } from "react";
import './../styles/calendario.css';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrap from "@fullcalendar/bootstrap";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";

class Calendario extends Component {
  handleEventClick = (clickInfo) => {
    console.log(clickInfo);
  };

  handleEvents = (events) => {
    console.log(events);
  };

  renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <b>{eventInfo.event.title}</b>
      </>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="card">
          <div className="card-header">
            <div className="card-header-toolbar"></div>
          </div>
          <div className="card-body" style={{ width: "1200px" }}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                bootstrap,
                interaction,
                timeGrid,
                calenderList
              ]}
              initialView="dayGridMonth"
              events={[
                {
                  title: "event 1",
                  date: "2020-09-01",
                  description: "Toto lorem ipsum dolor sit incid idunt ut",
                  className: "fc-event-solid-warning",
                  eventContent: "some text"
                },
                { title: "event 2", date: "2024-01-02" },
                { title: "event 3", date: "2024-02-02" }
              ]}
              eventColor="#378006"
              themeSystem="bootstrap"
              navLinks="true"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,calenderList"
              }}
              locales="allLocales"
              locale="es"
              firstDay="1"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              eventContent={this.renderEventContent}
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents}
              height={700} 
              
               // Ajusta la altura según tus necesidades
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calendario;
