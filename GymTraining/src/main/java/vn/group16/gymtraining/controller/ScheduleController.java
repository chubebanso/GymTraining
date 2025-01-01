package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.dto.DurationStatDTO;
import vn.group16.gymtraining.dto.EventDTO;
import vn.group16.gymtraining.dto.WorkoutCountStatDTO;
import vn.group16.gymtraining.service.ScheduleService;

@RestController
@RequestMapping("/api/v1")
public class ScheduleController {
    final private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<Schedule>> getSchedule(@RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime, @RequestParam("date") LocalDate date) {

        return ResponseEntity.ok(this.scheduleService.getScheduleByTime(startTime, endTime, date));
    }

    @GetMapping("/get-all-event")
    public ResponseEntity<List<EventDTO>> getSchedules() {
        List<EventDTO> events = scheduleService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/get-schedule-by-date")
    public ResponseEntity<List<Schedule>> getSchedulesByDate(@RequestParam("date") LocalDate date) {
        List<Schedule> schedules = scheduleService.getScheduleByDate(date);
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/schedule")
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        Schedule newSchedule = scheduleService.createSchedule(schedule);
        return ResponseEntity.ok(newSchedule);
    }

    @PutMapping("/schedule/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable long id, @RequestBody Schedule schedule) {
        Schedule updatedSchedule = scheduleService.updateSchedule(id, schedule);
        return ResponseEntity.ok(updatedSchedule);

    }

    @GetMapping("/get-all-schedule")
    public ResponseEntity<List<Schedule>> getAllSchedule() {
        return ResponseEntity.ok(this.scheduleService.getAllSchedule());
    }

    @GetMapping("/schedule/calories/day")
    public ResponseEntity<Integer> computeCaloriesInDay(@RequestParam("date") LocalDate date) {
        Integer calories = scheduleService.computeCaloriesInDay(date);
        if (calories != null) {
            return ResponseEntity.ok(calories);
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/schedule/save-completed-workout")
    public ResponseEntity<Schedule> saveCompletedWorkout(@RequestParam("scheduleId") long scheduleId,
            @RequestParam("workoutId") long workoutId) {
        Schedule schedule = scheduleService.addCompletedWorkoutToSchedule(scheduleId, workoutId);
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/schedule/calories/last-7-day")
    public ResponseEntity<Integer> computeCaloriesInLast7Day(@RequestParam("date") LocalDate date) {
        Integer calories = scheduleService.computeCaloriesInLast7Day(date);
        if (calories != null) {
            return ResponseEntity.ok(calories);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/schedule/calories/all")
    public ResponseEntity<Integer> computeCaloriesAll() {
        Integer calories = scheduleService.computeCaloriesAll();
        if (calories != null) {
            return ResponseEntity.ok(calories);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/schedule/duration-stats")
    public ResponseEntity<List<DurationStatDTO>> getMonthlyDurationStats(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        List<DurationStatDTO> stats = scheduleService.getMonthlyDurationStats(year, month);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("schedule/workouts-stats")
    public ResponseEntity<List<WorkoutCountStatDTO>> getMonthlyWorkoutCountStats(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        List<WorkoutCountStatDTO> stats = scheduleService.getMonthlyWorkoutCountStats(year, month);
        return ResponseEntity.ok(stats);
    }

}
