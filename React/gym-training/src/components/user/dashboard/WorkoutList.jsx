import React, { useEffect, useState } from 'react';
import './WorkoutList.css';

const WorkoutCard = ({ workout }) => {
    return (
        <div className="workout-card">
            <p className="workout-time">Today</p>
            <p>Duration: {workout.duration}</p>
            <p>Workout details: {workout.description}</p>
        </div>
    );
};

const WorkoutList = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

    const getVietnamDate = () => {
        const vietnamTimeOffset = 7 * 60;
        const localDate = new Date();
        const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
        const vietnamDate = new Date(utcDate.getTime() + vietnamTimeOffset * 60000);
        return vietnamDate.toLocaleDateString('en-CA');
    };

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const date = getVietnamDate();
                const response = await fetch(`http://localhost:8080/api/v1/workouts/recent-workout?date=${date}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });
                const data = await response.json();
                setWorkoutData(data.data);
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };

        fetchWorkoutData();
    }, []);

    return (
        <div>Upcoming Workouts
                {workoutData
                    .slice(0, showAll ? workoutData.length : 3)
                    .map((workout, index) => (
                        <WorkoutCard key={index} workout={workout} />
                    ))}
                <div className="view-all">
                    <a onClick={() => setShowAll(!showAll)}>
                        {showAll ? 'Show less' : 'View all'}
                    </a>
                </div>
        </div>
    );
};

export default WorkoutList;