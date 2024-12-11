/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import {
  Modal,
  Input,
  Form,
  Checkbox,
  DatePicker,
  TimePicker,
  Drawer,
} from "antd";
import "./GymCalendar.css";
import moment from "moment";

const GymCalendar = () => {
  const calendarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false); // Drawer visibility
  const [selectedWorkouts, setSelectedWorkouts] = useState([]); // Store selected workout

  const workouts = [
    { id: 1, name: "pushup", description: "Push-up" },
    { id: 2, name: "squat", description: "Squat" },
    { id: 3, name: "running", description: "Running" },
    { id: 4, name: "cycling", description: "Cycling" },
  ];

  useEffect(() => {
    const calendarEl = calendarRef.current;

    const loadEvents = async (callback) => {
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
          }));
          callback(events);
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "addCalendar,dayGridMonth,timeGridWeek,timeGridDay",
      },
      customButtons: {
        addCalendar: {
          text: "+ Calendar",
          click: function () {
            // Open the modal when the + Calendar button is clicked
            setIsOpen(true);
          },
        },
      },
      height: "100vh",
      initialView: "dayGridMonth",
      dateClick: (info) => {
        const selectedDate = moment(info.date);
        form.setFieldsValue({ startDate: selectedDate });
        setIsOpen(true); // Open the modal when clicking on a date
      },
    });

    loadEvents((events) => {
      calendar.addEventSource(events);
      calendar.render();
    });
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        setIsOpen(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleWorkoutSelect = (checkedValues) => {
    setSelectedWorkouts(checkedValues);
    setDrawerVisible(false);
    form.setFieldsValue({ workout: checkedValues });
  };

  return (
    <>
      <Modal
        title="Workout"
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" name="custom_form">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select a start date!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select a start time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select an end time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="Workout"
            name="workout"
            rules={[{ required: true, message: "Please select at least one workout!" }]}
          >
            <Input
              value={selectedWorkouts.length > 0 ? selectedWorkouts.join(", ") : ""}
              onClick={showDrawer}
              readOnly
            />
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title="Select Workout"
        placement="left"
        onClose={onCloseDrawer}
        open={drawerVisible}
      >
        <Checkbox.Group
          style={{ width: "100%" }}
          value={selectedWorkouts}
          onChange={handleWorkoutSelect}
        >
          {workouts.map((option) => (
            <Checkbox key={option.id} value={option.name}>
              {option.description}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Drawer>

      <div ref={calendarRef} />
    </>
  );
};

export default GymCalendar;
