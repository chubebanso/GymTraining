import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Modal, Input, Form, Checkbox, DatePicker, TimePicker, Button } from "antd";
import "./GymCalendar.css";
import moment from "moment";

const GymCalendar = () => {
  const calendarRef = useRef(null);
  const [showEventPopup, setShowEventPopup] = useState(false); // For "Add Event" popup
  const [showEventDetailsPopup, setShowEventDetailsPopup] = useState(false); // For event details popup
  const [form] = Form.useForm(); // Create form instance using Ant Design's useForm
  const [selectedWorkouts, setSelectedWorkouts] = useState([]); // Store selected workout
  const [workouts, setWorkouts] = useState([]); // Store workouts fetched from the API
  const [events, setEvents] = useState([]); // Store events from the API
  const [eventDetails, setEventDetails] = useState(null); // Store clicked event details

  // Fetch workout data from the API
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/workouts', {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.statusCode === 200) {
          // Set the workouts from API data
          setWorkouts(response.data.data);
        } else {
          console.error("Error fetching workouts:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    // Fetch events (schedule data) from the API
    const fetchEvents = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No access token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/get-all-schedule",
          {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.statusCode === 200) {
          const events = response.data.data.map((event) => ({
            title: event.title,
            start: event.date + 'T' + event.startTime,
            end: event.date + 'T' + event.endTime,
            id: event.id, // You can use event ID for more details if necessary
            workouts: event.workouts || [], // Thêm thông tin workouts vào sự kiện
          }));
          setEvents(events); // Set the events
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchWorkouts(); // Fetch workouts
    fetchEvents(); // Fetch events
  }, []);

  const handleCancel = () => {
    setShowEventPopup(false);
    setShowEventDetailsPopup(false); // Close event details popup
    form.resetFields(); // Reset form when closing the popup
  };

  const handleOk = () => {
    console.log("Saving event..."); // Thêm log khi nhấn nút Save Event
    form
      .validateFields()
      .then(async (values) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token not found. Please log in.");
          return;
        }

        const requestData = {
          title: values.title.trim(), // Trim để loại bỏ khoảng trắng
          date: values.startDate.format("YYYY-MM-DD"), // Ngày bắt đầu
          startTime: values.startTime.format("HH:mm"), // Thời gian bắt đầu
          workouts: selectedWorkouts.map((id) => ({ id })), // Định dạng [{ "id": 1 }, { "id": 2 }]
        };

        console.log("Request Data:", requestData); // Thêm log để xem dữ liệu gửi đi

        try {
          const response = await axios.post(
            "http://localhost:8080/api/v1/schedule", // Endpoint để lưu sự kiện
            requestData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.statusCode === 200) {
            console.log("Event saved successfully:", response.data.message);

            // Cập nhật state events để hiển thị trên calendar
            const newEvent = {
              id: response.data.data.id, // Lưu ID của sự kiện mới
              title: response.data.data.title,
              start: `${response.data.data.date}T${response.data.data.startTime}`,
              end: `${response.data.data.date}T${response.data.data.endTime}`, // Thêm thời gian kết thúc
              workouts: response.data.data.workouts, // Lưu thông tin workouts nếu cần
            };
            setEvents([...events, newEvent]);

            setShowEventPopup(false);
            form.resetFields();
            setSelectedWorkouts([]); // Reset selected workouts
          } else {
            console.error("Failed to save event:", response.data.message);
          }
        } catch (error) {
          console.error("Error saving event:", error);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleWorkoutSelect = (checkedValues) => {
    setSelectedWorkouts(checkedValues);
  };

  const handleStartTimeChange = (time) => {
    form.setFieldsValue({ startTime: time });
  };

  const handleDeleteEvent = async (eventId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found. Please log in.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/delete-event/${eventId}`, // Endpoint để xoá sự kiện
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode === 200) {
        console.log("Event deleted successfully:", response.data.message);
        setEvents(events.filter(event => event.id !== eventId)); // Cập nhật state để loại bỏ sự kiện đã xoá
      } else {
        console.error("Failed to delete event:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEventClick = (info) => {
    const clickedEvent = info.event;
    console.log("Event Clicked:", clickedEvent);

    setEventDetails({
      title: clickedEvent.title,
      start: moment(clickedEvent.start).format("YYYY-MM-DD HH:mm"),
      end: moment(clickedEvent.end).format("YYYY-MM-DD HH:mm"),
      workouts: clickedEvent.extendedProps.workouts || [], // Lấy thông tin workouts từ event
    });

    setShowEventDetailsPopup(true); // Show the popup with event details
  };

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "addCalendar,dayGridMonth,timeGridWeek,timeGridDay",
      },
      customButtons: {
        addCalendar: {
          text: "Add Event",
          click: function () {
            setShowEventPopup(true); // Open the "Add Event" popup when the button is clicked
          },
        },
      },
      height: "100vh",
      initialView: "dayGridMonth",
      dateClick: function(info) {
        const selectedDate = moment(info.date); // Convert the clicked date to moment.js format
        const today = moment().startOf("day"); // Get today's date at midnight

        if (selectedDate.isBefore(today)) {
          alert("Không thể thêm sự kiện vào ngày đã qua."); // Thêm thông báo khi click vào ngày trước đó
          return;
        }

        form.setFieldsValue({ startDate: selectedDate });
        setShowEventPopup(true); // Open the "Add Event" popup when clicking on a date
      },
      events: events, // Add events from the API to the calendar
      eventClick: handleEventClick, // Handle event click to show details
    });

    calendar.render();
  }, [events, form]);

  return (
    <>
      <div className="calendar-wrapper">
        {showEventPopup && (
          <div className="add-event-container">
            <div className="event-form">
              <h2>{eventDetails ? "Event Details" : "Add New Event"}</h2>
              <Form form={form} layout="vertical" name="custom_form">
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please input your title!" }]}
                >
                  <Input disabled={showEventDetailsPopup} />
                </Form.Item>

                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: "Please select a start date!" }]}
                >
                  <DatePicker disabled={showEventDetailsPopup} />
                </Form.Item>

                <Form.Item
                  label="Start Time"
                  name="startTime"
                  rules={[{ required: true, message: "Please select a start time!" }]}
                >
                  <TimePicker format="HH:mm" onChange={handleStartTimeChange} />
                </Form.Item>
              </Form>
            </div>

            <div className="workout-selection">
              <h2>Select Workouts</h2>
              <Checkbox.Group
                style={{ width: "100%" }}
                value={selectedWorkouts}
                onChange={handleWorkoutSelect}
              >
                {workouts.map((workout) => (
                  <div className="workout-item" key={workout.id}>
                    <Checkbox value={workout.id}>{workout.name}</Checkbox>
                  </div>
                ))}
              </Checkbox.Group>

              <div className="action-buttons">
                <Button type="primary" onClick={handleOk}>
                  Save Event
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {showEventDetailsPopup && (
          <Modal
            title="Event Details"
            visible={showEventDetailsPopup}
            onCancel={handleCancel}
            footer={null}
          >
            <p><strong>Title:</strong> {eventDetails?.title}</p>
            <p><strong>Start:</strong> {eventDetails?.start}</p>
            <p><strong>End:</strong> {eventDetails?.end}</p>
            <p><strong>Workouts:</strong></p>
            <ul>
              {eventDetails?.workouts.length > 0 ? (
                eventDetails.workouts.map(workout => (
                  <li key={workout.id}>
                    <img src={`avatars/${workout.image}`} alt={workout.name} style={{ width: '50px', marginRight: '10px' }} />
                    {workout.name}
                  </li>
                ))
              ) : (
                <li>Không có workout nào.</li> // Thông báo nếu không có workout
              )}
            </ul>
            <Button className="delete-event-button" type="danger" onClick={() => handleDeleteEvent(eventDetails.id)}>Delete Event</Button>
          </Modal>
        )}

        <div ref={calendarRef} />
      </div>
    </>
  );
};

export default GymCalendar;
