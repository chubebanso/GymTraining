//import React from 'react'
import TodoPlan from "../components/todayplan/TodayPlan"
import GymCalendar from "../components/gymCalendar/GymCalendar"
import './css/Schedule.css'
const Schedule = () => {
  return (
    <div className="schedule">
        <TodoPlan />
        <GymCalendar />
    </div>
  )
}

export default Schedule