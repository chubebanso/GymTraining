/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from "react";
import { Calendar } from "@fullcalendar/core";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import {
  Button,
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
  const [isOpen, setIsOpen] = useState(true);
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

    // Hàm gọi API sử dụng axios
    const loadEvents = async (callback) => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/get-all-event"
        );
        if (response.data.statusCode === 200) {
          const events = response.data.data.map((event) => ({
            title: event.title,
            start: event.start, // Loại bỏ giây không hợp lệ
            end: event.end,
          }));
          callback(events); // Trả danh sách sự kiện
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Khởi tạo lịch FullCalendar
    const calendar = new Calendar(calendarEl, {
      plugins: [googleCalendarPlugin, dayGridPlugin, timeGridPlugin],
      // googleCalendarApiKey: 'AIzaSyC1zOMS5TDNiSnaVN8kiZ03xNdlzjhisvI', // Thay thế bằng API Key của bạn
      // eventSources: [
      //   {
      //     googleCalendarId: '3ikfa3tlqp6mes51b8erostteo@group.calendar.google.com', // Thay thế bằng ID lịch của bạn
      //     className: 'gcal-event' // Tùy chọn để thêm class cho sự kiện
      //   },
      // ],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "addCalendar,dayGridMonth,timeGridWeek,timeGridDay",
      },
      customButtons: {
        addCalendar: {
          text: "+ Calendar",
          click: function () {
            alert("từ từ sẽ có chức năng này");
            //  thêm hành động hoặc thực hiện thêm sự kiện tại đây
          },
        },
      },
      height: "100vh",
      width: "150wh",
      initialView: "dayGridMonth",
      dateClick: (info) => {
        const selectedDate = moment(info.date); // Ensure using moment object
        form.setFieldsValue({ startDate: selectedDate }); // Set the moment object directly
        setIsOpen(true);
      },
    });

    // Gọi API để tải dữ liệu sự kiện
    loadEvents((events) => {
      calendar.addEventSource(events); // Thêm sự kiện vào lịch
      calendar.render();
    });
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };

  // Hide modal
  const handleCancel = () => {
    setIsOpen(false);
  };

  // Handle form submission
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        setIsOpen(false);
        form.resetFields(); // Reset form fields
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Hide Drawer
  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  // Handle selecting workout from drawer
  // Handle selecting workouts from drawer (using checkbox)
  const handleWorkoutSelect = (checkedValues) => {
    setSelectedWorkouts(checkedValues); // Set selected workouts
    setDrawerVisible(false); // Close drawer after selection
    form.setFieldsValue({ workout: checkedValues }); // Set selected workouts to form
  };

  return (
    <>
      <Modal
        title="Workout"
        open={isOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        destroyOnClose={true} // Destroy modal content on close
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

          {/* Trường nhập giờ bắt đầu */}
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select a start time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          {/* Trường nhập giờ kết thúc */}
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select an end time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          {/* Workout Select (Checkbox Group) */}
          <Form.Item
            label="Workout"
            name="workout"
            rules={[
              {
                required: true,
                message: "Please select at least one workout!",
              },
            ]}
          >
            <Input
              value={
                selectedWorkouts.length > 0 ? selectedWorkouts.join(", ") : ""
              }
              onClick={showDrawer}
              readOnly
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Drawer (Sidebar) for selecting workout */}
      <Drawer
        title="Select Workout"
        placement="left"
        onClose={onCloseDrawer}
        open={drawerVisible}
      >
        <Checkbox.Group
          style={{ width: "100%", top: "inherit" }}
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
