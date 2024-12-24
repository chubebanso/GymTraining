package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

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

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.service.WorkoutService;
import vn.group16.gymtraining.util.error.WorkoutException;

@RestController
@RequestMapping("/api/v1")
public class WorkoutController {

    final private WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/workouts/category/{category}")
    public ResponseEntity<List<Workout>> getWorkoutByCategory(@PathVariable String category) {
        List<Workout> workouts = workoutService.getWorkoutByCategory(category);
        if (workouts != null && !workouts.isEmpty()) {
            return ResponseEntity.ok(workouts);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/workouts/difficulty/{difficultyLevel}")
    public ResponseEntity<List<Workout>> getWorkoutByDifficultyLevel(@PathVariable String difficultyLevel) {
        List<Workout> workouts = workoutService.getWorkoutByDifficultyLevel(difficultyLevel);
        if (workouts != null && !workouts.isEmpty()) {
            return ResponseEntity.ok(workouts);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/workouts")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkoutDetails() {
        List<WorkoutDTO> workouts = workoutService.getAllWorkoutDetails();
        if (!workouts.isEmpty()) {
            return ResponseEntity.ok(workouts);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/workouts")
    public ResponseEntity<Workout> createWorkout(
            @RequestBody WorkoutDTO workout) {
        Workout createdWorkout = workoutService.createWorkout(workout);
        return ResponseEntity.ok(createdWorkout);
    }

    @PutMapping("/workouts/{id}")
    public ResponseEntity<Workout> updateWorkout(
            @PathVariable("id") Long id,
            @RequestBody Workout workoutDetails) {

        try {
            Workout updatedWorkout = workoutService.updateWorkout(id, workoutDetails);
            return ResponseEntity.ok(updatedWorkout);
        } catch (WorkoutException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/workouts/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) throws WorkoutException {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }

    //api get recent workout
    @GetMapping("/workouts/recent-workout")
    public ResponseEntity<List<WorkoutDTO>> getRecentWorkout(@RequestParam("date") LocalDate date) {
        List<WorkoutDTO> workouts = workoutService.getRecentWorkout(date);
        if (workouts != null && !workouts.isEmpty()) {
            return ResponseEntity.ok(workouts);
        }
        return ResponseEntity.noContent().build();
    }    

    @GetMapping("/workouts/history-workout-by-date")
    public ResponseEntity<List<WorkoutDTO>> getHistoryWorkoutByDate(@RequestParam("date") LocalDate date) {
        List<WorkoutDTO> workouts = workoutService.getHistoryWorkoutByDate(date);
        if (workouts != null && !workouts.isEmpty()) {
            return ResponseEntity.ok(workouts);
        }
        return ResponseEntity.noContent().build();
    }
}
