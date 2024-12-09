import "./AddWorkout.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import plus_img from "../../../assets/plus.svg";
import trash from "../../../assets/trash.svg";

const AddWorkout = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exerciseRows, setExerciseRows] = useState([{ id: 1, name: '', reps: '' }]);

  const navigate = useNavigate();  // Khởi tạo hook useNavigate để điều hướng

  const addRowExercise = () => {
    const newRow = { id: Date.now(), name: '', reps: '' };
    setExerciseRows([...exerciseRows, newRow]);
  };

  const handleDeleteRow = (id) => {
    setExerciseRows(exerciseRows.filter(row => row.id !== id));
  };

  // Hàm xử lý khi form được submit
  const onFinish = (values) => {
    console.log("Form values:", values);  // Log lại giá trị của form để kiểm tra

    setIsSubmitting(true);  // Đặt trạng thái submitting khi gửi form

    // Giả lập gửi dữ liệu và thông báo thành công
    setTimeout(() => {
      // Hiển thị thông báo thành công sau khi gửi form
      message.success("Tạo buổi tập thành công!");

      form.resetFields();  // Reset form sau khi submit thành công
      setIsSubmitting(false);  // Dừng trạng thái submitting

      // Quay lại màn hình trước (màn hình workout list)
      navigate("../");  // Quay về màn hình trước đó
    }, 1000);  // Thời gian giả lập gửi form (1 giây)
  };

  const handleBack = () => {
    navigate("../");  // Quay lại màn hình trước
  };

  return (
    <div className="content-workout">
      {/* Header Section */}
      <div className="add-workout-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <h2>Create New Workout</h2>
      </div>

      {/* Main Form Section */}
      <Form form={form} onFinish={onFinish} className="add-workout-form">
        <div className="workout-info">
          {/* Left Side: General Information */}
          <div className="workout-info-left">
            <h3>General Information</h3>
            <h4>Preview</h4>
            <img src={ava_account} alt="Profile" />
            <Button className="upload-btn">Upload Photo</Button>
          </div>

          {/* Right Side: Workout Details Form */}
          <div className="workout-info-right">
            <div className="standard-text-field">
              <div className="component-name">Name workout</div>
              <Form.Item
                name="workoutName"
                rules={[{ required: true, message: "Please enter the workout name!" }]}
              >
                <Input placeholder="Ex: Leg" />
              </Form.Item>
            </div>

            <div className="standard-text-field">
              <div className="component-name">Description</div>
              <Form.Item
                name="description"
                rules={[{ required: true, message: "Please enter a description!" }]}
              >
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
            </div>

            <div className="workout-info-right-mini">
              <div className="calories">
                <div className="component-name">Calories Burned</div>
                <Form.Item
                  name="calories"
                  rules={[{ required: true, message: "Please enter calories burned!" }]}
                >
                  <Input placeholder="Ex: 400" />
                </Form.Item>
              </div>

              <div className="duration">
                <div className="component-name">Duration</div>
                <Form.Item
                  name="duration"
                  rules={[{ required: true, message: "Please enter duration!" }]}
                >
                  <Input placeholder="Ex: 15m" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="exercise-list">
          <div className="exercise-list-left">
            <h3>Exercise List</h3>
          </div>
          <div className="exercise-list-right">
            <div className="exercise-header">
              <div className="exercise-header-left">
                <div className="exercise-name">Name exercise</div>
                <div className="exercise-reps">Sets/Reps</div>
              </div>

              {/* Nút dấu cộng, chỉ hiển thị cho hàng cuối cùng */}
              <img
                src={plus_img}
                alt="Add Exercise"
                onClick={addRowExercise}
                className="btn-plus"
              />
            </div>

            {/* Render các input fields */}
            {exerciseRows.map((row) => (
              <div className="input-fields" key={row.id}>
                <Form.Item
                  className="exercise-name"
                  name={`exerciseName_${row.id}`}
                  rules={[{ required: true, message: "Please enter exercise name!" }]}
                >
                  <Input.TextArea placeholder="Ex: Band Pull Apart" />
                </Form.Item>
                <Form.Item
                  className="exercise-reps"
                  name={`exerciseReps_${row.id}`}
                  rules={[{ required: true, message: "Please enter sets/reps!" }]}
                >
                  <Input.TextArea placeholder="Ex: 3x12 Reps" />
                </Form.Item>
                <img
                  className="img-trash"
                  src={trash}
                  alt="Delete"
                  onClick={() => handleDeleteRow(row.id)} // Xử lý sự kiện khi click vào thùng rác
                />
              </div>
            ))}
          </div>
        </div>

        {/* Media Section */}
        <div className="workout-media">
          <div className="workout-media-left">
            <h3>Additional Media</h3>
          </div>
          <div className="workout-media-right">
            <h3>Video</h3>
            <div className="workout-video">
              <Upload.Dragger
                name="files"
                multiple={false}
                showUploadList={false}
                action="/upload.do"
              >
                <div className="upload-section">
                  <img className="img" alt="Frame" src={ava_account} />
                  <p className="p">Click or drag file to this area to upload</p>
                </div>
              </Upload.Dragger>
            </div>
          </div>
        </div>

        {/* Goal Section */}
        <div className="workout-goal">
          <div className="workout-goal-left">
            <h3>Goal & Characteristics</h3>
          </div>
          <div className="workout-goal-right">
            <div className="category">
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Category</h4>
              <Form.Item
                name="category"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select
                  style={{ width: '100%', height: '40px' }}
                  placeholder="Ex: Full Body Strength, Yoga"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  InputProps={{ style: { height: '40px' } }}
                  className="custom-select"
                >
                  <Option value="Strength">Strength</Option>
                  <Option value="Cardio">Cardio</Option>
                  <Option value="Yoga">Yoga</Option>
                  <Option value="Full Body">Full Body</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="target">
              <h4>Target Muscle Groups</h4>
              <Form.Item
                name="targetMuscle"
                rules={[{ required: true, message: "Please select target muscle group!" }]}
              >
                <Select
                  style={{ width: '100%', height: '40px' }}
                  placeholder="Ex: Leg"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  InputProps={{ style: { height: '40px' } }}
                  className="custom-select"
                >
                  <Option value="Legs">Legs</Option>
                  <Option value="Chest">Chest</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="level">
              <h4>Difficulty Level</h4>
              <Form.Item
                name="difficultyLevel"
                rules={[{ required: true, message: "Please select difficulty level!" }]}
              >
                <Select
                  style={{ width: '100%', height: '40px' }}
                  placeholder="Ex: Novice"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  InputProps={{ style: { height: '40px' } }}
                  className="custom-select"
                >
                  <Option value="Easy">Easy</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Hard">Hard</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="done">
          <Button className="btn-cancel" onClick={handleBack}>Cancel</Button>
          <Button
            className="btn-create"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"  // Đảm bảo khi click sẽ trigger onFinish
          >
            Create workout
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddWorkout;
