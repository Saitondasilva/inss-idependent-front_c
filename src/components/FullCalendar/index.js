import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const MyFullCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Reunião com o cliente',
      start: '2023-03-01T10:00:00',
      end: '2023-03-01T12:00:00',
      description: 'Apresentação do novo produto',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Treinamento da equipe',
      start: '2023-03-03T14:00:00',
      end: '2023-03-03T16:00:00',
      description: 'Treinamento de vendas',
      color: 'green'
    }
  ]);

  const handleDateSelect = (selectInfo) => {
    const title = window.prompt('Digite o título do evento:');
    if (title) {
      setEvents([
        ...events,
        {
          id: String(events.length + 1),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr
        }
      ]);
    }
  };

  const handleEventClick = (clickInfo) => {
    const confirmed = window.confirm(`Deseja excluir o evento "${clickInfo.event.title}"?`);
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== clickInfo.event.id));
    }
  };

  const handleEventChange = (changeInfo) => {
    setEvents(
      events.map((event) =>
        event.id === changeInfo.event.id
          ? {
              ...event,
              start: changeInfo.event.startStr,
              end: changeInfo.event.endStr
            }
          : event
      )
    );
  };

  const eventRender = (info) => {
    const { description, color } = info.event.extendedProps || {};
    if (description) {
      info.el.querySelector('.fc-content').setAttribute('title', description);
    }
    if (color) {
      info.el.querySelector('.fc-event-main').style.backgroundColor = color;
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={events}
      select={handleDateSelect}
      eventClick={handleEventClick}
      eventChange={handleEventChange}
      eventRender={eventRender}
    />
  );
};

export default MyFullCalendar;