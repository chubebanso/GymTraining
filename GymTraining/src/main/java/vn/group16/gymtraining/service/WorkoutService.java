package vn.group16.gymtraining.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.repository.WorkoutRepository;

@Service
public class WorkoutService {
    final private WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<Workout> getWorkoutByCategory(String category) {
        Optional<List<Workout>> workoutsOptional = this.workoutRepository.findWorkoutByCategory(category);
        if (workoutsOptional.isPresent()) {
            return workoutsOptional.get();
        } else
            return null;
    }

    public List<Workout> getWorkoutByDifficultyLevel(String difficultyLevel) {
        Optional<List<Workout>> workoutsOptional = this.workoutRepository.findWorkoutByDifficultyLevel(difficultyLevel);
        if (workoutsOptional.isPresent()) {
            return workoutsOptional.get();
        } else
            return null;
    }

    public List<WorkoutDTO> getAllWorkoutDetails() {
        List<Workout> workouts = this.workoutRepository.findAll();
        List<WorkoutDTO> workoutDetails = new ArrayList<>();
    
        for (Workout workout : workouts) {
            // Tạo một DTO từ dữ liệu trong đối tượng Workout
            WorkoutDTO dto = new WorkoutDTO(                          
                workout.getName(),                         
                workout.getDescription(),                  
                workout.getImage(),                       
                workout.getDuration(),
                workout.getCalories(),                    
                workout.getCategory(),                    
                workout.getMuscleGroups(),                 
                workout.getDifficultyLevel()               
            );
            
            workoutDetails.add(dto);  
        }
    
        return workoutDetails;  
    }

    public Workout createWorkout(Workout workout) {
        return this.workoutRepository.save(workout);
    }

    public Workout updateWorkout(Long id, Workout workoutDetails) {
        Workout existingWorkout = this.workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found with id: " + id));
        
        existingWorkout.setName(workoutDetails.getName());
        existingWorkout.setDescription(workoutDetails.getDescription());
        existingWorkout.setImage(workoutDetails.getImage());
        existingWorkout.setDuration(workoutDetails.getDuration());
        existingWorkout.setCalories(workoutDetails.getCalories());
        existingWorkout.setCategory(workoutDetails.getCategory());
        existingWorkout.setMuscleGroups(workoutDetails.getMuscleGroups());
        existingWorkout.setDifficultyLevel(workoutDetails.getDifficultyLevel());

        return this.workoutRepository.save(existingWorkout);
    }

    public void deleteWorkout(Long id) {
        Workout workout = this.workoutRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Workout not found with id: " + id));
        
        this.workoutRepository.delete(workout);
    }
}