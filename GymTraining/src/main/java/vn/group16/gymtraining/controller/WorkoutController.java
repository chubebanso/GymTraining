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

import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.EventDTO;
import vn.group16.gymtraining.service.ScheduleService;
import vn.group16.gymtraining.service.WorkoutService;

@RestController
@RequestMapping("/api/v1")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @GetMapping("/workouts/search")
    public List<Workout> searchWorkouts(@RequestParam String name) {
        return workoutService.searchWorkoutsByName(name);
    }

}
