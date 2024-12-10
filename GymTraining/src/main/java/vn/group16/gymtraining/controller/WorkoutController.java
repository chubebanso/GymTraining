package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.group16.gymtraining.domain.Exercise;
import vn.group16.gymtraining.domain.Workout;

import vn.group16.gymtraining.dto.EventDTO;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.service.ExerciseService;
import vn.group16.gymtraining.service.ScheduleService;

import vn.group16.gymtraining.service.WorkoutService;

@RestController
@RequestMapping("/api/v1")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/workouts/search")
    public List<Workout> searchWorkouts(@RequestParam String name) {
        return workoutService.findWorkoutsByName(name);
    }

    @GetMapping("/workouts/getAll")
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

    @PostMapping(value = "/workouts")
    public ResponseEntity<Workout> createWorkout(@RequestBody Workout workout) {
        return ResponseEntity.ok(workoutService.createWorkout(workout, 1L));
    }

    @GetMapping("/workouts/getById/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }

    @DeleteMapping("/workouts/delete/{id}")
    public ResponseEntity<String> deleteWorkout(@PathVariable long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.ok("Workout deleted successfully");
    }

    @PutMapping(value = "/workouts/update")
    public ResponseEntity<Workout> updateWorkoutByAdmin(@RequestBody Workout workout) {
        return ResponseEntity.ok(workoutService.updateWorkoutByAdmin(workout));
    }

    @PostMapping(value = "/workouts/create")
    public ResponseEntity<Workout> createWorkoutByAdmin(@RequestBody Workout workout) {
        // Save the workout first to ensure it has an ID
        Workout savedWorkout = workoutService.createWorkoutByAdmin(workout);
        return ResponseEntity.ok(savedWorkout);
    }

}
