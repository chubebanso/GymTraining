package vn.group16.gymtraining.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Exercise;
import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.WorkoutDTO;
import vn.group16.gymtraining.repository.ExerciseRepository;
import vn.group16.gymtraining.repository.ScheduleRepository;
import vn.group16.gymtraining.repository.WorkoutRepository;
import vn.group16.gymtraining.util.error.WorkoutException;

@Service
public class WorkoutService {
    final private WorkoutRepository workoutRepository;
    private final UploadService uploadService;
    private final ExerciseRepository exerciseRepository;
    private final ScheduleRepository scheduleRepository;

    public WorkoutService(WorkoutRepository workoutRepository, UploadService uploadService,
            ExerciseRepository exerciseRepository, ScheduleRepository scheduleRepository) {
        this.workoutRepository = workoutRepository;
        this.uploadService = uploadService;
        this.exerciseRepository = exerciseRepository;
        this.scheduleRepository = scheduleRepository;
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
                    workout.getId(),
                    workout.getName(),
                    workout.getDescription(),
                    workout.getImage(),
                    workout.getVideoUrl(),
                    workout.getDuration(),
                    workout.getCalories(),
                    workout.getCategory(),
                    workout.getMuscleGroups(),
                    workout.getDifficultyLevel(),
                    workout.getExercises()

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
        workout.setVideoUrl(workoutDTO.getVideoUrl());
        if (workoutDTO.getExercises() != null && !workoutDTO.getExercises().isEmpty()) {
            workoutDTO.getExercises().forEach(exercise -> {
                exercise.setWorkout(workout); // Liên kết workout cho exercise
            });
            workout.setExercises(workoutDTO.getExercises());
        }

        return workoutRepository.save(workout);
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
        if (workoutOptional.isPresent()) {
            return workoutOptional.get();
        }
        throw new WorkoutException("Không tìm thấy bài tập");
    }

    public List<WorkoutDTO> getRecentWorkout(LocalDate date) {
        // Lấy danh sach lich tap trong ngay
        List<Schedule> schedules = scheduleRepository.findScheduleByDate(date).orElse(Collections.emptyList());

         // Filter schedules by start time
        List<Schedule> filteredSchedules = schedules.stream()
            .filter(schedule -> {
                LocalTime scheduleTime = LocalTime.parse(schedule.getStartTime());
                //LocalTime currentTime = LocalTime.parse(startTime);
                LocalTime currentTime = LocalTime.parse(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
                System.out.println("Current time: " + currentTime);
                // Get workouts starting within next 30 minutes
                return scheduleTime.isAfter(currentTime);
                      // &&  scheduleTime.isBefore(currentTime.plusMinutes(30));
            })
            .collect(Collectors.toList());

        List<WorkoutDTO> workoutDetails = new ArrayList<>();
        for (Schedule schedule : filteredSchedules) {
            for (Workout workout : schedule.getWorkouts()) {
                WorkoutDTO dto = new WorkoutDTO(
                    workout.getId(),
                    workout.getName(),
                    workout.getDescription(),
                    workout.getImage(),
                    workout.getVideoUrl(),
                    workout.getDuration(),
                    workout.getCalories(),
                    workout.getCategory(),
                    workout.getMuscleGroups(),
                    workout.getDifficultyLevel(),
                    workout.getExercises()
                );
                workoutDetails.add(dto);
            }
        }
        return workoutDetails;
    }

    public List<WorkoutDTO> getHistoryWorkoutByDate(LocalDate date) {
        // Lấy danh sach lich tap trong ngay
        List<Schedule> schedules = scheduleRepository.findScheduleByDate(date).orElse(Collections.emptyList());

        List<WorkoutDTO> workoutDetails = new ArrayList<>();
        for (Schedule schedule : schedules) {
            for (Workout workout : schedule.getCompletedWorkouts()) {
                WorkoutDTO dto = new WorkoutDTO(
                    workout.getId(),
                    workout.getName(),
                    workout.getDescription(),
                    workout.getImage(),
                    workout.getVideoUrl(),
                    workout.getDuration(),
                    workout.getCalories(),
                    workout.getCategory(),
                    workout.getMuscleGroups(),
                    workout.getDifficultyLevel(),
                    workout.getExercises()
                );
                workoutDetails.add(dto);
            }
        }
        return workoutDetails;
    }
}