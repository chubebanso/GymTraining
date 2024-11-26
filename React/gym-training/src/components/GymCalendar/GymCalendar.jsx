/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'; // Import axios
import './GymCalendar.css';

const GymCalendar = () => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;

    // Hàm gọi API sử dụng axios
    const loadEvents = async (callback) => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/v1/get-all-event');
        if (response.data.statusCode === 200) {
          const events = response.data.data.map((event) => ({
            title: event.title,
            start: event.start, // Loại bỏ giây không hợp lệ
            end: event.end,
          }));
          callback(events); // Trả danh sách sự kiện
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Khởi tạo lịch FullCalendar
    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin],
      
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      height: '100vh',
      width: '150wh',
      initialView: 'dayGridMonth'
    });

    // Gọi API để tải dữ liệu sự kiện
    loadEvents((events) => {
      calendar.addEventSource(events); // Thêm sự kiện vào lịch
      calendar.render();
    });
  }, []);

  return <div ref={calendarRef} />;
};

export default GymCalendar;
