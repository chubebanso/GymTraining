package vn.group16.gymtraining.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.dto.EventDTO;
import vn.group16.gymtraining.repository.ScheduleRepository;
import vn.group16.gymtraining.repository.WorkoutRepository;

@Service
public class ScheduleService {
    final private ScheduleRepository scheduleRepository;
    private final WorkoutRepository workoutRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, WorkoutRepository workoutRepository) {
        this.scheduleRepository = scheduleRepository;
        this.workoutRepository = workoutRepository;
    }

    @Transactional
    public Schedule createSchedule(Schedule schedule) {
        // Tìm kiếm các workout theo danh sách tên

        List<Long> workoutId = schedule.getWorkouts().stream().map(Workout::getId).collect(Collectors.toList());
        List<Workout> workouts = this.workoutRepository.findByIdIn(workoutId);
        System.out.println("Workouts found: " + workouts.size());
        Schedule currentSchedule = new Schedule();
        currentSchedule.setTitle(schedule.getTitle());
        currentSchedule.setDate(schedule.getDate());
        currentSchedule.setStartTime(schedule.getStartTime());
        currentSchedule.setEndTime(schedule.getEndTime());

        if (workouts.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy bài tập nào từ danh sách tên cung cấp.");
        }
        currentSchedule.setWorkouts(workouts);
        return this.scheduleRepository.save(currentSchedule);
    }

    public Schedule updateSchedule(long id, Schedule schedule) {
        Schedule existingSchedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + id));

        existingSchedule.setStartTime(schedule.getStartTime());
        existingSchedule.setEndTime(schedule.getEndTime());
        existingSchedule.setDate(schedule.getDate());
        existingSchedule.setTitle(schedule.getTitle());
        existingSchedule.setWorkouts(schedule.getWorkouts());

        return scheduleRepository.save(existingSchedule);
    }

    public void deleteSchedule(long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new RuntimeException("Schedule not found with id: " + id);
        }
        scheduleRepository.deleteById(id);
    }

    public List<Schedule> getScheduleByTime(String startTime, String endTime, LocalDate date) {
        Optional<List<Schedule>> scheduleOptional = this.scheduleRepository
                .findScheduleByStartTimeAndEndTimeAndDate(startTime, endTime, date);
        if (scheduleOptional.isPresent()) {
            return scheduleOptional.get();
        } else
            return null;
    }

    public List<EventDTO> getAllEvents() {
        List<Schedule> schedules = this.scheduleRepository.findAll();
        List<EventDTO> events = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        for (Schedule schedule : schedules) {
            String title = schedule.getTitle();
            String start = schedule.getDate() + "T" + schedule.getStartTime() + ":00";
            String end = schedule.getDate() + "T" + schedule.getEndTime() + ":00";

            events.add(new EventDTO(title, start, end));
        }

        return events;
    }

    public List<Schedule> getScheduleByDate(LocalDate date) {
        Optional<List<Schedule>> listSchedule = this.scheduleRepository.findScheduleByDate(date);
        if (listSchedule.isPresent()) {
            return listSchedule.get();
        } else
            return null;
    }

    public Schedule addWorkoutToSchedule(long scheduleId, long workoutId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleId));

        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + workoutId));

        schedule.getWorkouts().add(workout);

        return scheduleRepository.save(schedule);
    }

    public Schedule removeWorkoutFromSchedule(long scheduleId, long workoutId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleId));

        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + workoutId));

        schedule.getWorkouts().remove(workout);

        return scheduleRepository.save(schedule);
    }

    public Integer computeCaloriesInDay(LocalDate date) {
        Optional<List<Schedule>> listSchedule = this.scheduleRepository.findScheduleByDate(date);
        Integer totalCalories = 0;
        if (listSchedule.isPresent()) {
            List<Schedule> schedules = listSchedule.get();
            for (Schedule schedule : schedules) {
                for (Workout workout : schedule.getCompletedWorkouts()) {
                    totalCalories += workout.getCalories();
                }
            }
            return totalCalories;
        } else
            return totalCalories;
    }

    public Schedule addCompletedWorkoutToSchedule(long scheduleId, long workoutId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleId));

        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new RuntimeException("Workout not found with id: " + workoutId));

        // Check if workout exists in schedule's workouts
        boolean workoutExists = schedule.getWorkouts().stream()
                .anyMatch(existingWorkout -> existingWorkout.getId().equals(workout.getId()));

        if (!workoutExists) {
            throw new RuntimeException("Workout not in this schedule");
        }
        // Check if workout already exists in completedWorkouts
        if (schedule.getCompletedWorkouts().stream()
                .anyMatch(completedWorkout -> completedWorkout.getId().equals(workout.getId()))) {
            throw new RuntimeException("Workout already completed for this schedule");
        }
        schedule.getCompletedWorkouts().add(workout);

        return scheduleRepository.save(schedule);
    }
}
