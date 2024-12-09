package vn.group16.gymtraining.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.repository.ScheduleRepository;
import vn.group16.gymtraining.repository.WorkoutRepository;


@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final ScheduleRepository scheduleRepository;

    public WorkoutService(
        WorkoutRepository workoutRepository, 
        ScheduleRepository scheduleRepository
    ) {
        this.workoutRepository = workoutRepository;
        this.scheduleRepository = scheduleRepository;
    }

    /**
     * Create a new workout and associate it with a schedule
     * @param workout Workout to be created
     * @param scheduleId ID of the schedule to associate with
     * @return Created workout
     */
    @Transactional
    public Workout createWorkout(Workout workout, Long scheduleId) {
        // Find the schedule
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new RuntimeException("Schedule not found"));
        
        // Set the schedule for the workout
        workout.setSchedule(schedule);
        
        // Save the workout
        return workoutRepository.save(workout);
    }
    /**
     * Find workouts by name
     * @param name Workout name
     * @return List of workouts matching the name
     */
    public List<Workout> findWorkoutsByName(String name) {
        return workoutRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Get all workouts for a specific schedule
     * @param scheduleId ID of the schedule
     * @return List of workouts for the schedule
     */
    public List<Workout> getWorkoutsBySchedule(Long scheduleId) {
        return workoutRepository.findByScheduleId(scheduleId);
    }

    /**
     * Update an existing workout
     * @param workoutId ID of the workout to update
     * @param updatedWorkout Updated workout details
     * @return Updated workout
     */
    @Transactional
    public Workout updateWorkout(Long workoutId, Workout updatedWorkout) {
        Workout existingWorkout = workoutRepository.findById(workoutId)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        // Update fields
        existingWorkout.setName(updatedWorkout.getName());
        existingWorkout.setDescription(updatedWorkout.getDescription());
        existingWorkout.setImage(updatedWorkout.getImage());
        
        return workoutRepository.save(existingWorkout);
    }

    /**
     * Delete a workout by its ID
     * @param workoutId ID of the workout to delete
     */
    @Transactional
    public void deleteWorkout(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        workoutRepository.delete(workout);
    }

    /**
     * Get workout by ID
     * @param workoutId ID of the workout
     * @return Workout if found
     */
    public Workout getWorkoutById(Long workoutId) {
        return workoutRepository.findById(workoutId)
            .orElseThrow(() -> new RuntimeException("Workout not found"));
    }

    /**
     * Get all workouts
     * @return List of all workouts
     */

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public List<Workout> findWorkoutsByDay(LocalDate date) {
        // Find schedules for the given date
        List<Schedule> schedules = scheduleRepository.findScheduleByDate(date)
            .orElse(List.of()); // Return empty list if no schedules found

        // Collect workouts from these schedules
        return schedules.stream()
            .flatMap(schedule -> schedule.getWorkout().stream())
            .collect(Collectors.toList());
    }

    
    // public WorkoutDTO getWorkoutById(long id) {
    //     Optional<Workout> workoutOptional = workoutRepository.findById(id);
    //     return workoutOptional.map(this::convertToDTO).orElse(null);
    // }

    // public Workout handleCreateWorkout(WorkoutDTO workoutDTO) {
    //     Workout workout = convertToEntity(workoutDTO);
    //     return workoutRepository.save(workout);
    // }

    public String handleDeleteWorkout(long id) {
        if (workoutRepository.findById(id).isPresent()) {
            workoutRepository.deleteById(id);
            return "Delete success";
        } else {
            return "Workout not found";
        }
    }

}