import "./EditWorkout.css";
import { useNavigate } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_workout from "../../../assets/edit_workout_ex.png";
import ava_workout2 from "../../../assets/edit_workout_ex2.png";
import { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import plus_img from "../../../assets/plus.svg";
import trash from "../../../assets/trash.svg";
import { useParams } from "react-router-dom";
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
  const id = parseInt(useParams().id);
  console.log(id);
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState(null);
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log("Workout details:", response.data.data);
        const workout = response.data.data;
       setWorkoutData(workout);
        form.setFieldsValue({
          workoutName: workout.name,
          description: workout.description,
          calories: workout.calories,
          duration: workout.duration,
          category: workout.category,
          targetMuscle: workout.muscleGroups.map((group) => group.name),
          difficultyLevel: workout.difficultyLevel,
        });
        const exerciseFields = workout.exercises.reduce((acc, exercise, index) => {
          acc[`exerciseName_${index}`] = exercise.name;
          acc[`exerciseReps_${index}`] = exercise.sets;
          return acc;
        }, {});
  
        form.setFieldsValue(exerciseFields); // Set dynamic exercise fields
        setExerciseRows(
          workout.exercises.map((exercise, index) => ({
            id: index,
            exerciseName: exercise.name,
            setsReps: exercise.sets,
          }))
        );
      } catch (error) {
        console.error("There was an error fetching the workout details!", error);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id, form]);

    
  

  const addRowExercise = () => {
    setExerciseRows([...exerciseRows, { exerciseName: "", setsReps: "" }]);
  };

  const handleDeleteRow = (index) => {
    setExerciseRows(exerciseRows.filter((_, idx) => idx !== index));
  };

  const onFinish = async (values) => {
    console.log("Form values:", values);
    setIsSubmitting(true);

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
    const workoutForm = {
      name: values.workoutName,
      description: values.description,
      duration: values.duration,
      calories: values.calories,
      category: values.category,
      muscleGroups: muscleGroups, // Dùng "muscleGroups" thay vì "muscleGroup"
      difficultyLevel: values.difficultyLevel,
      // image: workoutData.image, // Tên file ảnh đã upload
      // exercises: exercises, // Danh sách bài tập
      videoUrl: values.videoUrl,
    };
    console.log("Workout form:", workoutForm);
    await axios.put(`http://localhost:8080/api/v1/workouts/${id}`, workoutForm, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
  });

    message.success("Workout updated successfully!");
    setIsSubmitting(false);
    navigate("../");
  } catch (error) {
    console.error("There was an error updating the account!", error);
    message.error("Failed to update account!");
  } finally {
    setIsSubmitting(false);
  }
};


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
                  <Input.TextArea placeholder="Ex: 10 (reps/sets)" />
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
                  placeholder="Ex: Body Strength, Yoga"
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
                  <Option value="Full_Body_Strength">Body Strength</Option>
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
