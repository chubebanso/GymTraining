import "./AddWorkout.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import plus_img from "../../../assets/plus.svg";
import trash from "../../../assets/trash.svg";
import axios from "axios";

const { Option } = Select;

const exerciseOptions = [
  { value: "Push-up", label: "Push-up" },
  { value: "Squat", label: "Squat" },
  { value: "Deadlift", label: "Deadlift" },
  { value: "Lunges", label: "Lunges" },
  { value: "Bench Press", label: "Bench Press" },
  { value: "Pull-up", label: "Pull-up" },
  { value: "Plank", label: "Plank" },
  { value: "Band Pull Apart", label: "Band Pull Apart" },
  // Add other exercises as needed
];

const muscleGroupsOptions = [
  { value: "LEGS", label: "Legs" },
  { value: "CHEST", label: "Chest" },
  { value: "BACK", label: "Back" },
  { value: "FULL_BODY", label: "Full Body" },
  { value: "ARMS", label: "Arms" },
  { value: "SHOULDERS", label: "Shoulders" },
];

const AddWorkout = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exerciseRows, setExerciseRows] = useState([{ id: 1 }]);
  const [imageFileName, setImageFileName] = useState("");
  const navigate = useNavigate();

  const addRowExercise = () => {
    const newRow = { id: Date.now() };
    setExerciseRows([...exerciseRows, newRow]);
  };

  const handleDeleteRow = (id) => {
    setExerciseRows(exerciseRows.filter((row) => row.id !== id));
  };
  const handleFileUpload = async (file) => {
    const accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("imageFile", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/upload?imageFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const fileName = response.data; // Lấy tên file từ response
      setImageFileName(fileName);
      message.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Upload ảnh thất bại!");
    }
  };
  const onFinish = async (values) => {
    console.log("Form values:", values);
    setIsSubmitting(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      // Chuyển đổi targetMuscle thành mảng các đối tượng với key "name"
      const muscleGroups = values.targetMuscle.map((muscle) => ({
        name: muscle, // API yêu cầu { "name": "value" }
      }));

      // Chuẩn bị dữ liệu exercises
      const exercises = exerciseRows.map((row) => ({
        name: values[`exerciseName_${row.id}`],
        sets: values[`exerciseReps_${row.id}`],
      }));

      // Chuẩn bị workoutData gửi lên API
      const workoutData = {
        name: values.workoutName,
        description: values.description,
        duration: values.duration,
        calories: values.calories,
        category: values.category,
        muscleGroups: muscleGroups, // Dùng "muscleGroups" thay vì "muscleGroup"
        difficultyLevel: values.difficultyLevel,
        image: imageFileName, // Tên file ảnh đã upload
        exercises: exercises, // Danh sách bài tập
        videoUrl: values.videoUrl,
      };

      // Gọi API
      await axios.post("http://localhost:8080/api/v1/workouts", workoutData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      message.success("Tạo buổi tập thành công!");
      form.resetFields();
      navigate("../");
    } catch (error) {
      console.error("Error creating workout:", error);
      message.error("Đã xảy ra lỗi khi tạo buổi tập. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("../");
  };

  return (
    <div className="content-workout">
      <div className="workout-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div>Create New Workout</div>
      </div>

      <Form form={form} onFinish={onFinish} className="workout-form">
        <div className="workout-info">
          <div className="workout-info-left">
            <span>General Information</span>
            <span>Preview</span>
            <img
              src={imageFileName ? `/avatars//${imageFileName}` : ava_account}
              alt="Uploaded"
            />
            <Upload
              beforeUpload={handleFileUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button className="upload-btn">Upload Photo</Button>
            </Upload>
          </div>

          <div className="workout-info-right">
            <div className="standard-text-field">
              <div className="component-name">Name workout</div>
              <Form.Item
                name="workoutName"
                rules={[
                  { required: true, message: "Please enter the workout name!" },
                ]}
              >
                <Input placeholder="Ex: Leg" />
              </Form.Item>
            </div>

            <div className="standard-text-field">
              <div className="component-name">Description</div>
              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please enter a description!" },
                ]}
              >
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
            </div>

            <div className="workout-info-right-mini">
              <div className="workout-info-right-label">
                <div className="component-name">Calories Burned</div>
                <Form.Item
                  name="calories"
                  rules={[
                    {
                      required: true,
                      message: "Please enter calories burned!",
                    },
                  ]}
                >
                  <Input placeholder="Ex: 400" />
                </Form.Item>
              </div>

              <div className="workout-info-right-label">
                <div className="component-name">Duration</div>
                <Form.Item
                  name="duration"
                  rules={[
                    { required: true, message: "Please enter duration!" },
                  ]}
                >
                  <Input placeholder="Ex: 15" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>

        <div className="workout-info">
          <div className="workout-info-left">
            <span>Exercise List</span>
          </div>
          <div className="workout-info-right">
            <div className="workout-info-header">
              <div className="component-name">Name exercise</div>
              <div className="component-name">Sets/Reps</div>

              <img
                src={plus_img}
                alt="Add Exercise"
                onClick={addRowExercise}
                className="workout-icon"
              />
            </div>

            {exerciseRows.map((row) => (
              <div className="workout-info-item" key={row.id}>
                <Form.Item
                  className="exercise-name"
                  name={`exerciseName_${row.id}`}
                  rules={[
                    { required: true, message: "Please select an exercise!" },
                  ]}
                >
                  <Select
                    placeholder="Select Exercise"
                    options={exerciseOptions}
                  />
                </Form.Item>
                <Form.Item
                  className="exercise-reps"
                  name={`exerciseReps_${row.id}`}
                  rules={[
                    { required: true, message: "Please enter sets/reps!" },
                  ]}
                >
                  <Input.TextArea placeholder="Ex: 3x12 Reps" />
                </Form.Item>
                <img
                  className="workout-icon"
                  src={trash}
                  alt="Delete"
                  onClick={() => handleDeleteRow(row.id)}
                />
              </div>
            ))}
            <div className="workout-info-right">
              <div className="component-name">Video</div>
            </div>
            <div className="workout-info-right">
              <Upload.Dragger
                name="files"
                multiple={false}
                showUploadList={false}
                action="/upload.do"
                className="upload-section"
              >
                <div className="upload-section">
                  <img className="upload-section-img" alt="Frame" src="" />
                  <p className="p">Click or drag file to this area to upload</p>
                </div>
              </Upload.Dragger>
            </div>
          </div>
        </div>
        <div className="workout-info">
          <div className="workout-info-left">
            <span>Goal & Characteristics</span>
          </div>
          <div className="workout-info-right">
            <div className="category">
              <div className="component-name">Category</div>
              <Form.Item
                name="category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select
                  style={{ width: "100%", height: "40px" }}
                  placeholder="Ex: Full Body Strength, Yoga"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="custom-select"
                >
                  <Option value="Strength">Strength</Option>
                  <Option value="Cardio">Cardio</Option>
                  <Option value="Yoga">Yoga</Option>
                  <Option value="Full_Body_Strength">Full Body Strength</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="target">
              <div className="component-name">Target Muscle Groups</div>
              <Form.Item
                name="targetMuscle"
                rules={[
                  {
                    required: true,
                    message: "Please select target muscle group!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%", height: "40px" }}
                  placeholder="Ex: Leg"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="custom-select"
                >
                  {muscleGroupsOptions.map((group) => (
                    <Option key={group.value} value={group.value}>
                      {group.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="level">
            <div className="component-name">Difficulty Level</div>
              <Form.Item
                name="difficultyLevel"
                rules={[
                  {
                    required: true,
                    message: "Please select difficulty level!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%", height: "40px" }}
                  placeholder="Ex: Novice"
                  showSearch
                  allowClear
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="custom-select"
                >
                  <Option value="BEGINNER">Beginner</Option>
                  <Option value="INTERMEDIATE">Intermediate</Option>
                  <Option value="ADVANCED">Advanced</Option>
                  <Option value="EXPERT">Expert</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="workout-info-done">
          <Button onClick={handleBack}>
            Cancel
          </Button>
          <Button
            className="btn-done"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"
          >
            Create workout
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddWorkout;
