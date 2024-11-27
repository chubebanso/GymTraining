import './App.css';
import WorkoutContextProvide from './context/WorkoutContextProvider'
import User from './pages/User'
function App() {
  return (
    <WorkoutContextProvide>
      <User />
    </WorkoutContextProvide>
  );
}

export default App;
