import "./EditWorkout.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_account from "../../../assets/ava_account.png";
import ava_workout from "../../../assets/edit_workout_ex.png";
import ava_workout2 from "../../../assets/edit_workout_ex2.png";
import { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import plus_img from "../../../assets/plus.svg";
import trash from "../../../assets/trash.svg";
const { Option } = Select;

const EditWorkout = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exerciseRows, setExerciseRows] = useState([
    { exerciseName: "Band Pull Apart", setsReps: "3x12 Reps" },
    { exerciseName: "Push Up", setsReps: "4x15 Reps" }
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
      <div className="edit-workout-header">
        <LeftCircleOutlined className="back-icon" onClick={handleBack} />
        <h2>Edit Workout</h2>
      </div>

      {/* Main Form Section */}
      <Form form={form} onFinish={onFinish} className="edit-workout-form">
        <div className="workout-info">
          {/* Left Side: General Information */}
          <div className="workout-info-left">
            <h3>General Information</h3>
            <h4>Preview</h4>
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
                rules={[{ required: true, message: "Please enter the workout name!" }]}
              >
                <Input placeholder="Ex: Leg" />
              </Form.Item>
            </div>

            <div className="standard-text-field">
              <div className="component-name">Description</div>
              <Form.Item
                name="description"
                initialValue="A great workout for legs."
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
                  initialValue="500"
                  rules={[{ required: true, message: "Please enter calories burned!" }]}
                >
                  <Input placeholder="Ex: 400" />
                </Form.Item>
              </div>

              <div className="duration">
                <div className="component-name">Duration</div>
                <Form.Item
                  name="duration"
                  initialValue="45m"
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
              <img
                src={plus_img}
                alt="Add Exercise"
                onClick={addRowExercise}
                className="btn-plus"
              />
            </div>

            {/* Render các input fields */}
            {exerciseRows.map((row, index) => (
              <div className="input-fields" key={index}>
                <Form.Item
                  className="exercise-name"
                  name={`exerciseName_${index}`}
                  initialValue={row.exerciseName}
                  rules={[{ required: true, message: "Please enter exercise name!" }]}
                >
                  <Input.TextArea placeholder="Ex: Band Pull Apart" />
                </Form.Item>
                <Form.Item
                  className="exercise-reps"
                  name={`setsReps_${index}`}
                  initialValue={row.setsReps}
                  rules={[{ required: true, message: "Please enter sets/reps!" }]}
                >
                  <Input.TextArea placeholder="Ex: 3x12 Reps" />
                </Form.Item>
                <img
                  className="img-trash"
                  src={trash}
                  alt="Delete"
                  onClick={() => handleDeleteRow(index)}
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
                  <img className="img" alt="Frame" src={ava_workout2} />
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
                initialValue="Strength"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select style={{ width: '100%' }}>
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
                initialValue="Legs"
                rules={[{ required: true, message: "Please select target muscle group!" }]}
              >
                <Select style={{ width: '100%' }}>
                  <Option value="Legs">Legs</Option>
                  <Option value="Chest">Chest</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="level">
              <h4>Difficulty Level</h4>
              <Form.Item
                name="difficultyLevel"
                initialValue="Easy"
                rules={[{ required: true, message: "Please select difficulty level!" }]}
              >
                <Select style={{ width: '100%' }}>
                  <Option value="Easy">Easy</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Hard">Hard</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="done">
          <Button className="btn-cancel" onClick={handleBack}>Cancel</Button>
          <Button
            className="btn-save"
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
