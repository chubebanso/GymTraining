import { useState } from "react";
import TodayPlan from "../../components/user/todayplan/TodayPlan";
import GymCalendar from "../../components/user/gymcalendar/GymCalendar";

const Schedule = () => {
  const [workouts, setWorkouts] = useState([]); // Shared workouts state

  return (
    <div className="schedule">
      {/* Pass workouts and setter to both components */}
      <TodayPlan/>
      {/* <TodoPlan workouts={workouts} setWorkouts={setWorkouts} /> */}
      <GymCalendar workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
};

export default Schedule;
