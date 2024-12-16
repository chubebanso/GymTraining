package vn.group16.gymtraining.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

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

    public Schedule createSchedule(Schedule schedule) {
        // Tìm kiếm các workout theo danh sách tên

        List<Long> workoutId = schedule.getWorkouts().stream().map(Workout::getId).collect(Collectors.toList());
        List<Workout> workouts = this.workoutRepository.findByIdIn(workoutId);
        Schedule currentSchedule = new Schedule();
        currentSchedule.setTitle(schedule.getTitle()); // Lỗi ở đây vì 'title' không được khai báo
        currentSchedule.setDate(schedule.getDate()); // Lỗi ở đây vì 'date' không được khai báo
        currentSchedule.setStartTime(schedule.getStartTime()); // Lỗi ở đây
        currentSchedule.setEndTime(schedule.getEndTime()); // Lỗi ở đây

        if (workouts.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy bài tập nào từ danh sách tên cung cấp.");
        }

        // Thêm các workout vào Schedule
        currentSchedule.setWorkouts(workouts);
        return this.scheduleRepository.save(schedule);
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
}
