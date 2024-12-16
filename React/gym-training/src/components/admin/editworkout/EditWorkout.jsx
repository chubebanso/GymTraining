import "./EditWorkout.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_workout from "../../../assets/edit_workout_ex.png";
import ava_workout2 from "../../../assets/edit_workout_ex2.png";
import { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import plus_img from "../../../assets/plus.svg";
import trash from "../../../assets/trash.svg";
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
];

const muscleGroupsOptions = [
  { value: "LEGS", label: "Legs" },
  { value: "CHEST", label: "Chest" },
  { value: "BACK", label: "Back" },
  { value: "FULL_BODY", label: "Full Body" },
  { value: "ARMS", label: "Arms" },
  { value: "SHOULDERS", label: "Shoulders" },
];

const EditWorkout = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exerciseRows, setExerciseRows] = useState([
    { exerciseName: "Band Pull Apart", setsReps: "3x12 Reps" },
    { exerciseName: "Push Up", setsReps: "4x15 Reps" },
  ]);

  const addRowExercise = () => {
    setExerciseRows([...exerciseRows, { exerciseName: "", setsReps: "" }]);
  };

  const handleDeleteRow = (index) => {
    setExerciseRows(exerciseRows.filter((_, idx) => idx !== index));
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    setIsSubmitting(true);

    setTimeout(() => {
      message.success("Workout updated successfully!");
      form.resetFields();
      setIsSubmitting(false);
      navigate("../");
    }, 1000);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("../");
  };

  return (
    <div className="content-workout">
      {/* Header Section */}
      <div className="workout-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <div>Edit Workout</div>
      </div>

      {/* Main Form Section */}
      <Form form={form} onFinish={onFinish} className="workout-form">
        <div className="workout-info">
          {/* Left Side: General Information */}
          <div className="workout-info-left">
            <span>General Information</span>
            <span>Preview</span>
            <img src={ava_workout} alt="Workout" />
            <Button className="upload-btn">Upload Photo</Button>
          </div>

          {/* Right Side: Workout Details Form */}
          <div className="workout-info-right">
            <div className="standard-text-field">
              <div className="component-name">Name workout</div>
              <Form.Item
                name="workoutName"
                initialValue="Leg Day"
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
                initialValue="A great workout for legs."
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
                  initialValue="500"
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
                  initialValue="45m"
                  rules={[
                    { required: true, message: "Please enter duration!" },
                  ]}
                >
                  <Input placeholder="Ex: 15m" />
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

            {/* Render các input fields */}
            {exerciseRows.map((row) => (
              <div className="workout-info-item" key={row.id}>
                <Form.Item
                  className="exercise-name"
                  name={`exerciseName_${row.id}`}
                  initialValue={row.exerciseName}
                  rules={[
                    { required: true, message: "Please enter exercise name!" },
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
                  initialValue={row.setsReps}
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
                  <img
                    className="upload-section-img"
                    alt="Frame"
                    src={ava_workout2}
                  />
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
                initialValue="Strength"
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
                initialValue="Legs"
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
                initialValue="Easy"
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
          <Button onClick={handleBack}>Cancel</Button>
          <Button
            className="btn-done"
            type="primary"
            loading={isSubmitting}
            htmlType="submit"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditWorkout;
