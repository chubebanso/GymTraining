package vn.group16.gymtraining.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.domain.WorkoutExercise;
import vn.group16.gymtraining.dto.ExerciseDTO;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.repository.WorkoutRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkoutService {
    @Autowired
    final private WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<Workout> searchWorkoutsByName(String name) {
        return workoutRepository.findByNameContaining(name);
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public WorkoutDTO getWorkoutById(long id) {
        Optional<Workout> workoutOptional = workoutRepository.findById(id);
        return workoutOptional.map(this::convertToDTO).orElse(null);
    }

    public Workout handleCreateWorkout(WorkoutDTO workoutDTO) {
        Workout workout = convertToEntity(workoutDTO);
        return workoutRepository.save(workout);
    }

    public String handleDeleteWorkout(long id) {
        if (workoutRepository.findById(id).isPresent()) {
            workoutRepository.deleteById(id);
            return "Delete success";
        } else {
            return "Workout not found";
        }
    }

    public WorkoutDTO handleUpdateWorkout(WorkoutDTO workoutDTO) {
        Optional<Workout> workoutOptional = workoutRepository.findById(workoutDTO.getId());
        if (workoutOptional.isPresent()) {
            Workout currentWorkout = workoutOptional.get();
            currentWorkout.setName(workoutDTO.getName());
            currentWorkout.setDescription(workoutDTO.getDescription());
            currentWorkout.setImage(workoutDTO.getImage());
            currentWorkout.setCalories(workoutDTO.getCalories());
            currentWorkout.setDuration(workoutDTO.getDuration());
            currentWorkout.setCategory(workoutDTO.getCategory());
            currentWorkout.setTargetMuscle(workoutDTO.getTargetMuscle());
            currentWorkout.setLevel(workoutDTO.getLevel());
            return convertToDTO(workoutRepository.save(currentWorkout));
        }
        return null;
    }

    private WorkoutDTO convertToDTO(Workout workout) {
        WorkoutDTO workoutDTO = new WorkoutDTO();
        workoutDTO.setId(workout.getId());
        workoutDTO.setName(workout.getName());
        workoutDTO.setDescription(workout.getDescription());
        workoutDTO.setImage(workout.getImage());
        workoutDTO.setDuration(workout.getDuration());
        workoutDTO.setCalories(workout.getCalories());
        workoutDTO.setCategory(workout.getCategory());
        workoutDTO.setTargetMuscle(workout.getTargetMuscle());
        workoutDTO.setLevel(workout.getLevel());
        return workoutDTO;
    }

    private Workout convertToEntity(WorkoutDTO workoutDTO) {
        Workout workout = new Workout();
        workout.setId(workoutDTO.getId());
        workout.setName(workoutDTO.getName());
        workout.setDescription(workoutDTO.getDescription());
        workout.setImage(workoutDTO.getImage());
        workout.setDuration(workoutDTO.getDuration());
        workout.setCalories(workoutDTO.getCalories());
        workout.setCategory(workoutDTO.getCategory());
        workout.setTargetMuscle(workoutDTO.getTargetMuscle());
        workout.setLevel(workoutDTO.getLevel());
        // Set exercises if needed
        return workout;
    }

    private ExerciseDTO convertToExerciseDTO(WorkoutExercise workoutExercise) {
        ExerciseDTO exerciseDTO = new ExerciseDTO();
        exerciseDTO.setExerciseId(workoutExercise.getExercise().getId());
        exerciseDTO.setName(workoutExercise.getExercise().getName());
        exerciseDTO.setSets(workoutExercise.getSets());
        return exerciseDTO;
    }
}