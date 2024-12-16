/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Import interaction plugin
import axios from "axios"; // Axios for API requests
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
          "http://localhost:8080/api/v1/get-all-event",
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
            start: event.start,
            end: event.end,
            id: event.id, // You can use event ID for more details if necessary
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
  form
    .validateFields()
    .then(async (values) => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token not found. Please log in.");
        return;
      }

      // Tạo requestData với định dạng chính xác
      const requestData = {
        title: values.title,
        date: values.startDate.format("YYYY-MM-DD"), // Ngày bắt đầu
        startTime: values.startTime.format("HH:mm"), // Thời gian bắt đầu
        endTime: values.endTime.format("HH:mm"),     // Thời gian kết thúc
        workouts: selectedWorkouts.map((id) => ({ id })), // Định dạng [{ "id": 10 }, ...]
      };

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
            title: response.data.data.title,
            start: `${response.data.data.date}T${response.data.data.startTime}`,
            end: `${response.data.data.date}T${response.data.data.endTime}`,
            id: response.data.data.id,
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
  console.log("Checked values:", checkedValues); // Kiểm tra các giá trị
  setSelectedWorkouts(checkedValues); // Cập nhật danh sách workout IDs được chọn
};


  // Handle event click to show details
  const handleEventClick = (info) => {
    const clickedEvent = info.event;
    console.log("Event Clicked:", clickedEvent);

    // Set the details of the clicked event
    setEventDetails({
      title: clickedEvent.title,
      start: moment(clickedEvent.start).format("YYYY-MM-DD HH:mm"),
      end: moment(clickedEvent.end).format("YYYY-MM-DD HH:mm"),
    });

    setShowEventDetailsPopup(true); // Show the popup with event details
  };

  // FullCalendar setup
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
        console.log("Clicked on: " + info.dateStr);
        console.log("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
        console.log("Current view: " + info.view.type);

        // Change the day's background color
        info.dayEl.style.backgroundColor = '#f0f0f0'; // Example of changing the clicked date's background

        const selectedDate = moment(info.date); // Convert the clicked date to moment.js format
        form.setFieldsValue({ startDate: selectedDate });
        setShowEventPopup(true); // Open the "Add Event" popup when clicking on a date
      },
      events: events, // Add events from the API to the calendar
      eventClick: handleEventClick, // Handle event click to show details
    });

    // Render calendar with the events
    calendar.render();
  }, [events, form]);

  return (
    <>
      <div className="calendar-wrapper">
        {/* Add Event Popup */}
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
                  <TimePicker format="HH:mm" disabled={showEventDetailsPopup} />
                </Form.Item>

                <Form.Item
                  label="End Time"
                  name="endTime"
                  rules={[{ required: true, message: "Please select an end time!" }]}
                >
                  <TimePicker format="HH:mm" disabled={showEventDetailsPopup} />
                </Form.Item>
              </Form>
            </div>

            <div className="workout-selection">
              <h2>Select Workouts</h2>
              <div className="workout-list">
        <Checkbox.Group
  style={{ width: "100%" }}
  value={selectedWorkouts}
  onChange={handleWorkoutSelect}
>
  {workouts.map((workout) => (
    <div className="workout-item" key={workout.id}>
      <Checkbox value={workout.id}>
        <div className="workout-content">
          <span className="workout-name">{workout.name}</span>
        </div>
      </Checkbox>
    </div>
  ))}
</Checkbox.Group>



              </div>
              <div className="action-buttons">
                <Button type="primary" onClick={handleOk}>
                  Save Event
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Popup */}
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
          </Modal>
        )}

        <div ref={calendarRef} />
      </div>
    </>
  );
};

export default GymCalendar;
