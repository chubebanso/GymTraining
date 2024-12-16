import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="home">
      <div className="home-chart">
        <div className="home-chart-overview">
          <div className="home-chart-overview-kcal">
            <div>Kcal Burn Overview</div>
          </div>
          <div className="hom-chart-overview-worout">
            <div>List upcoming</div>
          </div>
        </div>
        <div>
          Monly time Workout Comparison
        </div>
      </div>
      <div className="home-list">
        <div className="home-list-workout">
          <div>Upcoming Workouts</div>
        </div>
        <div className="home-list-achievement">
          <div>My Achievements</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
