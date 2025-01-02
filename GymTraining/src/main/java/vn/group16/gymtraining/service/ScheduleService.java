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
import vn.group16.gymtraining.dto.CaloriesStatDTO;
import vn.group16.gymtraining.dto.CaloriesStatWeekDTO;
import vn.group16.gymtraining.dto.DurationStatDTO;
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

        if (workouts.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy bài tập nào từ danh sách tên cung cấp.");
        }
        int totalDuration = workouts.stream().mapToInt(Workout::getDuration).sum();
        Schedule currentSchedule = new Schedule();
        currentSchedule.setTitle(schedule.getTitle());
        currentSchedule.setDate(schedule.getDate());
        currentSchedule.setStartTime(schedule.getStartTime());
        currentSchedule.setStartTimeAndDuration(schedule.getStartTime(), totalDuration);
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

    // public Schedule addWorkoutToSchedule(long scheduleId, long workoutId) {
    // Schedule schedule = scheduleRepository.findById(scheduleId)
    // .orElseThrow(() -> new RuntimeException("Schedule not found with id: " +
    // scheduleId));

    // Workout workout = workoutRepository.findById(workoutId)
    // .orElseThrow(() -> new RuntimeException("Workout not found with id: " +
    // workoutId));

    // schedule.getWorkouts().add(workout);

    // return scheduleRepository.save(schedule);
    // }

    // public Schedule removeWorkoutFromSchedule(long scheduleId, long workoutId) {
    // Schedule schedule = scheduleRepository.findById(scheduleId)
    // .orElseThrow(() -> new RuntimeException("Schedule not found with id: " +
    // scheduleId));

    // Workout workout = workoutRepository.findById(workoutId)
    // .orElseThrow(() -> new RuntimeException("Workout not found with id: " +
    // workoutId));

    // schedule.getWorkouts().remove(workout);

    // return scheduleRepository.save(schedule);
    // }

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

    public List<Schedule> getAllSchedule() {
        return this.scheduleRepository.findAll();
    }

    public Integer computeCaloriesInLast7Day(LocalDate date) {
        List<Schedule> listSchedule = this.scheduleRepository.findAll();
        Integer totalCalories = 0;
        if (!listSchedule.isEmpty()) {
            List<Schedule> schedules = listSchedule;
            for (Schedule schedule : schedules) {
                if (schedule.getDate().isAfter(date.minusDays(6)) && schedule.getDate().isBefore(date)) {
                    for (Workout workout : schedule.getCompletedWorkouts()) {
                        totalCalories += workout.getCalories();
                    }
                }
            }
            return totalCalories;
        } else
            return totalCalories;
    }

    public Integer computeCaloriesAll() {
        List<Schedule> listSchedule = this.scheduleRepository.findAll();
        Integer totalCalories = 0;
        if (!listSchedule.isEmpty()) {
            List<Schedule> schedules = listSchedule;
            for (Schedule schedule : schedules) {
                for (Workout workout : schedule.getCompletedWorkouts()) {
                    totalCalories += workout.getCalories();
                }
            }
            return totalCalories;
        } else
            return totalCalories;
    }

    public List<DurationStatDTO> getMonthlyDurationStats(int year, int month) {
        List<DurationStatDTO> stats = new ArrayList<>();
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        // Get all schedules for the month
        List<Schedule> monthSchedules = scheduleRepository.findAll().stream()
                .filter(s -> !s.getDate().isBefore(startDate) && !s.getDate().isAfter(endDate))
                .collect(Collectors.toList());

        // Create stats for every 5 days
        for (int day = 5; day <= endDate.getDayOfMonth(); day += 5) {
            LocalDate currentDate;
            LocalDate fiveDaysAgo;
            if (day > 25) {
                day = endDate.getDayOfMonth();
                currentDate = LocalDate.of(year, month, day);
                fiveDaysAgo = LocalDate.of(year, month, 26);
            } else {
                currentDate = LocalDate.of(year, month, day);
                fiveDaysAgo = currentDate.minusDays(4); // vì tính cả currentDate nên chỉ trừ 4
            }

            int totalDuration = monthSchedules.stream()
                    .filter(s -> !s.getDate().isBefore(fiveDaysAgo) && !s.getDate().isAfter(currentDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getDuration)
                    .sum();

            stats.add(new DurationStatDTO(day, totalDuration));
        }
        if (month == 2) { // nếu là tháng 2 thì thêm những ngày cuối cùng
            LocalDate currentDate = LocalDate.of(year, month, endDate.getDayOfMonth());
            LocalDate fiveDaysAgo = LocalDate.of(year, month, 26);

            int totalDuration = monthSchedules.stream()
                    .filter(s -> !s.getDate().isBefore(fiveDaysAgo) && !s.getDate().isAfter(currentDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getDuration)
                    .sum();

            stats.add(new DurationStatDTO(28, totalDuration));
        }
        return stats;
    }

    public List<CaloriesStatDTO> getMonthlyCaloriesStats(int year, int month) {
        List<CaloriesStatDTO> stats = new ArrayList<>();
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);

        // Get all schedules for the month
        List<Schedule> monthSchedules = scheduleRepository.findAll().stream()
                .filter(s -> !s.getDate().isBefore(startDate) && !s.getDate().isAfter(endDate))
                .collect(Collectors.toList());

        // Create stats for every 5 days
        for (int day = 5; day <= endDate.getDayOfMonth(); day += 5) {
            LocalDate currentDate;
            LocalDate fiveDaysAgo;
            if (day > 25) {
                day = endDate.getDayOfMonth();
                currentDate = LocalDate.of(year, month, day);
                fiveDaysAgo = LocalDate.of(year, month, 26);
            } else {
                currentDate = LocalDate.of(year, month, day);
                fiveDaysAgo = currentDate.minusDays(4); // vì tính cả currentDate nên chỉ trừ 4
            }

            int totalCalories = monthSchedules.stream()
                    .filter(s -> !s.getDate().isBefore(fiveDaysAgo) && !s.getDate().isAfter(currentDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getCalories)
                    .sum();

            stats.add(new CaloriesStatDTO(day, totalCalories));
        }
        if (month == 2) { // nếu là tháng 2 thì thêm những ngày cuối cùng
            LocalDate currentDate = LocalDate.of(year, month, endDate.getDayOfMonth());
            LocalDate fiveDaysAgo = LocalDate.of(year, month, 26);

            int totalCalories = monthSchedules.stream()
                    .filter(s -> !s.getDate().isBefore(fiveDaysAgo) && !s.getDate().isAfter(currentDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getCalories)
                    .sum();

            stats.add(new CaloriesStatDTO(28, totalCalories));
        }
        return stats;
    }

    // get calories stats in this week and last week by date
    public List<CaloriesStatWeekDTO> getWeeklyCaloriesStats(LocalDate date) {
        List<CaloriesStatWeekDTO> stats = new ArrayList<>();
        // Get the Monday and Sunday of the week
        LocalDate mondayDate = date.minusDays(date.getDayOfWeek().getValue() - 1);
        LocalDate sundayDate = mondayDate.plusDays(6);


        // Get all schedules for the this week
        List<Schedule> thisWeekSchedules = scheduleRepository.findAll().stream()
                .filter(s -> !s.getDate().isBefore(mondayDate) && !s.getDate().isAfter(sundayDate))
                .collect(Collectors.toList());

        // Get all schedules for the last week
        List<Schedule> lastWeekSchedules = scheduleRepository.findAll().stream()
                .filter(s -> !s.getDate().isBefore(mondayDate.minusDays(7)) && !s.getDate().isAfter(sundayDate.minusDays(7)))
                .collect(Collectors.toList());

        // Create stats for every day
        for (int day = 2; day <= 8; day++) {
            LocalDate currentDate = mondayDate.plusDays(day - 2);
            LocalDate lastWeekDate = currentDate.minusDays(7);

            int totalCaloriesInThisWeek = thisWeekSchedules.stream()
                    .filter(s -> s.getDate().isEqual(currentDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getCalories)
                    .sum();
            
            int totalCaloriesInLastWeek = lastWeekSchedules.stream()
                    .filter(s -> s.getDate().isEqual(lastWeekDate))
                    .flatMap(s -> s.getCompletedWorkouts().stream())
                    .mapToInt(Workout::getCalories)
                    .sum();
            
            stats.add(new CaloriesStatWeekDTO(day, totalCaloriesInLastWeek, totalCaloriesInThisWeek));
        }
        return stats;
    }
}
