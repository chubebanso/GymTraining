package vn.group16.gymtraining.controller;

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
import vn.group16.gymtraining.service.ExerciseService;

@RestController
@RequestMapping("/api/v1")
public class ExerciseController {

    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/exercises/search")
    public List<Exercise> searchExercises(@RequestParam String name) {
        return exerciseService.findExercisesByName(name);
    }

    @GetMapping("/exercises")
    public List<Exercise> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/exercises/{id}")
    public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
        Exercise exercise = exerciseService.getExerciseById(id);
        return exercise != null ? ResponseEntity.ok(exercise) : ResponseEntity.notFound().build();
    }

    @PostMapping("/exercises")
    public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
        return ResponseEntity.ok(exerciseService.createExercise(exercise));
    }

    @PutMapping("/exercises/{id}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise) {
        Exercise updatedExercise = exerciseService.updateExercise(id, exercise);
        return updatedExercise != null ? ResponseEntity.ok(updatedExercise) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/exercises/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
}
