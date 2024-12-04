package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.service.WorkoutService;

@RestController
@RequestMapping("/api/v1")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @GetMapping("/workouts/search")
    public List<Workout> searchWorkouts(@RequestParam String name) {
        return workoutService.findWorkoutsByName(name);
    }

    @GetMapping("/workouts")
    public List<Workout> getAllWorkouts() {
        return workoutService.getAllWorkouts();
    }

    @GetMapping("/workouts/{scheduleId}")
    public List<Workout> getWorkoutsBySchedule(@PathVariable Long scheduleId) {
        return workoutService.getWorkoutsBySchedule(scheduleId);
    }

    @GetMapping("/get-workout-by-day")
    public ResponseEntity<List<Workout>> getWorkoutByDay(@RequestParam("date") LocalDate date) {
    try {
        // Fetch workouts for the given day using the service
        List<Workout> workouts = workoutService.findWorkoutsByDay(date);

        // Return the workouts as a successful response
        return ResponseEntity.ok(workouts);
    } catch (Exception e) {
        // Log the exception for debugging (you could use a logger here)
        // For simplicity, we're just printing the stack trace.
        e.printStackTrace();
        
        // Return a 500 status code for internal server errors
        return ResponseEntity.status(500).body(null);
    }
}

    @PostMapping("/workouts")
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) {
        return ResponseEntity.ok(workoutService.createWorkout(workout, 1L));
    }

    
}
