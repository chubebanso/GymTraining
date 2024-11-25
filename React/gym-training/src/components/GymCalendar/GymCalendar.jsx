/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GymCalendar.css';
const GymCalendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin],
      googleCalendarApiKey: 'AIzaSyC1zOMS5TDNiSnaVN8kiZ03xNdlzjhisvI', // Thay thế bằng API Key của bạn
      eventSources: [
        {
          googleCalendarId: '3ikfa3tlqp6mes51b8erostteo@group.calendar.google.com', // Thay thế bằng ID lịch của bạn
          className: 'gcal-event' // Tùy chọn để thêm class cho sự kiện
        },
        {
          googleCalendarId: 'efgh5678@group.calendar.google.com', // Thêm nhiều lịch nếu cần
          className: 'nice-event'
        }
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        { title: 'Event 1', start: '2024-11-26', end: '2024-11-28' },
        { title: 'Event 2', start: '2024-11-27' },
        {
          title: 'Sự kiện 1',
          start: '2024-12-01T10:00:00',
          end: '2024-12-01T11:00:00',
          color: 'red', // Màu nền
          textColor: 'white', // Màu chữ
        },
        {
          title: 'Sự kiện 2',
          start: '2024-12-02T12:00:00',
          end: '2024-12-02T13:00:00',
          backgroundColor: 'blue', // Màu nền
          borderColor: 'darkblue', // Màu viền
          textColor: 'white', // Màu chữ
        },
      ],
      height: '100vh',
      width: '150wh',
      initialView: 'dayGridMonth'
    });

    calendar.render();
  }, []);

  return <div ref={calendarRef} />;
};

export default GymCalendar;
