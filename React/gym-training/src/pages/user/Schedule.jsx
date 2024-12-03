//import React from 'react'
import TodoPlan from "../../components/user/todayplan/TodayPlan"
import GymCalendar from "../../components/user/gymcalendar/GymCalendar"

const Schedule = () => {
  return (
    <div className="schedule">
      <TodoPlan />
      <GymCalendar />
    </div>
  )
}

export default Schedule