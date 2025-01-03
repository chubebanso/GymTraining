import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { createContext } from "react";

export const WorkoutContext = createContext();

const WorkoutContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/getAll",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      if (result.statusCode === 200) {
        setUsers(result.data);
      } else {
        console.error(
          "Error fetching data:",
          result ? result.message : "No result data"
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const createUser = async (values) => {
    console.log("values", values);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/users`,
        {
          name: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
          roleName: values.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const result = response.data;
      if (result.statusCode === 201) {
        console.log("User created successfully:", result.data);
        getUsers();
      } else {
        console.error("Error creating user:", result.message);
      }
    } catch (error) {
      console.error("User creation error:", error);
    }
  };

  const deleteUser = async (userid) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("accessToken");

      // Ensure token exists before making the request
      if (!token) {
        console.error("No authorization token found.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8080/api/v1/users/delete/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      getUsers();
      const result = response.data;
      if (result.statusCode === 200) {
        console.log("User deleted successfully:", result.data);
      } else {
        console.error("Error deleting user:", result.message);
      }
    } catch (error) {
      console.error("User deletion error:", error);
    }
  };

  const setWorkoutAsSelected = (workout) => {
    setSelectedWorkout(workout);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <WorkoutContext.Provider
      value={{
        users,
        createUser,
        deleteUser,
        selectedWorkout,
        setWorkoutAsSelected,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

// Add PropTypes validation
WorkoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkoutContextProvider;
