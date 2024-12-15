package vn.group16.gymtraining.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.repository.WorkoutRepository;
import vn.group16.gymtraining.util.error.WorkoutException;

@Service
public class WorkoutService {
    final private WorkoutRepository workoutRepository;
    private final UploadService uploadService;

    public WorkoutService(WorkoutRepository workoutRepository, UploadService uploadService) {
        this.workoutRepository = workoutRepository;
        this.uploadService = uploadService;
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

    public Workout createWorkout(WorkoutDTO workoutDTO) {
        Workout workout = new Workout();
        workout.setName(workoutDTO.getName());
        workout.setDescription(workoutDTO.getDescription());
        workout.setImage(workoutDTO.getImage());
        workout.setDuration(workoutDTO.getDuration());
        workout.setCalories(workoutDTO.getCalories());
        workout.setCategory(workoutDTO.getCategory());
        workout.setMuscleGroups(workoutDTO.getMuscleGroups());
        workout.setDifficultyLevel(workoutDTO.getDifficultyLevel());
        

        

        Workout savedWorkout = this.workoutRepository.save(workout);
        return savedWorkout;
    }

    public Workout updateWorkout(Long id, Workout workoutDetails) throws WorkoutException {
        Workout workoutOptional = findByWorkoutID(id);
        if (workoutOptional != null) {
            Workout existingWorkout = workoutOptional;
            existingWorkout.setName(workoutDetails.getName());
            existingWorkout.setDescription(workoutDetails.getDescription());
            existingWorkout.setImage(workoutDetails.getImage());
            existingWorkout.setDuration(workoutDetails.getDuration());
            existingWorkout.setCalories(workoutDetails.getCalories());
            existingWorkout.setCategory(workoutDetails.getCategory());
            existingWorkout.setMuscleGroups(workoutDetails.getMuscleGroups());
            existingWorkout.setDifficultyLevel(workoutDetails.getDifficultyLevel());


            

            return workoutRepository.save(existingWorkout);
        }
        return null;
    }

    public void deleteWorkout(Long id) throws WorkoutException {
        Workout workout = findByWorkoutID(id);
        
        workout.getMuscleGroups().clear();
        this.workoutRepository.delete(workout);
    }

    public Workout findByWorkoutID(Long id) throws WorkoutException {
        Optional<Workout> workoutOptional = this.workoutRepository.findById(id);
        if (workoutOptional.isPresent()){
            return workoutOptional.get();
        }
        throw new WorkoutException("Không tìm thấy bài tập");
    }
}