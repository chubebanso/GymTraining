import "./EditWorkout.css";
import { useNavigate, useParams } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import ava_workout from "../../../assets/edit_workout_ex.png";
import ava_workout2 from "../../../assets/edit_workout_ex2.png";
import { useState, useEffect } from "react";
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
  const [exerciseRows, setExerciseRows] = useState([]);
  const [imageFileName, setImageFileName] = useState("");
  const [workout, setWorkout] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkout = async () => {
      const workoutId = useParams().workout_id; // Assuming the workout ID is passed in the URL
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        console.error("Access token not found!");
        message.error("Login session has expired. Please login again.");
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/workouts/${workoutId}`, // API to fetch workout by ID
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          const workoutDetails = response.data.data;
          // Assuming the API returns workout details directly without a data wrapper
          form.setFieldsValue({
            workoutName: workoutDetails.name,
            description: workoutDetails.description,
            duration: workoutDetails.duration,
            calories: workoutDetails.calories,
            category: workoutDetails.category,
            difficultyLevel: workoutDetails.difficultyLevel,
            targetMuscle: workoutDetails.muscleGroups.map(mg => mg.name),
            // Add other fields as needed
          });
  
          // Update state if you need to manage exercises or other sub-components
          setExerciseRows(workoutDetails.exercises.map(ex => ({
            id: ex.id, // Ensure unique identifier for each exercise row
            exerciseName: ex.name,
            setsReps: `${ex.sets}x${ex.reps} Reps` // Concatenate sets and reps if necessary
          })));
          setImageFileName(workoutDetails.image);
          setWorkout(workoutDetails);
        } else {
          throw new Error('Failed to fetch workout details');
        }
      } catch (error) {
        console.error("Error fetching workout details: ", error);
        message.error("Failed to fetch workout details. Please try again.");
      }
    };
  fetchWorkout();
  }, []); // Ensure the useEffect hook runs only once on component mount unless dependencies change
  

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
      // Convert form values to the format expected by the API
      const muscleGroups = values.targetMuscle.map(muscle => ({ name: muscle }));
      const exercises = exerciseRows.map(row => ({
        name: values[`exerciseName_${row.id}`],
        sets: parseInt(values[`exerciseSets_${row.id}`].split('x')[0]),
        reps: parseInt(values[`exerciseSets_${row.id}`].split('x')[1].split(' ')[0])
      }));

      const workoutData = {
        name: values.workoutName,
        description: values.description,
        duration: values.duration,
        calories: values.calories,
        category: values.category,
        muscleGroups: muscleGroups,
        difficultyLevel: values.difficultyLevel,
        exercises: exercises,
        videoUrl: values.videoUrl,
      };

      // Send PUT request to the API
      const response = await axios.put(`http://localhost:8080/api/v1/workouts/${workout_id}`, workoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      });

      // Check response status
      if (response.status === 200) {
        message.success("Workout updated successfully!");
        form.resetFields();
        navigate("../");
      } else {
        throw new Error('Failed to update workout');
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      message.error("Failed to update workout. Please try again.");
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
          <div className="workout-info-left">
            <span>General Information</span>
            <span>Preview</span>
            <img
              src={imageFileName ? `/avatars//${imageFileName}` : ava_workout}
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

          {/* Right Side: Workout Details Form */}
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
                  <Input placeholder="Ex: 15m" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="workout-info">
        <div className="workout-info-left">
          <h4>Exercise List</h4>
        </div>
        <div className="workout-info-right">
          <div className="workout-info-header">
            <div className="component-name">Exercise Name</div>
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
