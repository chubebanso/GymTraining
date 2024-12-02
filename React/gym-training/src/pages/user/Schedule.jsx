//import React from 'react'
import TodoPlan from "../../components/user/todayplan/TodayPlan"
import GymCalendar from "../../components/user/gymcalendar/GymCalendar"
import '../css/Schedule.css'

const Schedule = () => {
  return (
    <div className="schedule">
      <TodoPlan />
      <GymCalendar />
    </div>
  )
}

export default Schedule