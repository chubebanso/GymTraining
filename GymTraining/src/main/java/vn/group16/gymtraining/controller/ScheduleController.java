package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
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
import vn.group16.gymtraining.dto.EventDTO;
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
    Schedule createdSchedule = scheduleService.createSchedule(schedule);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);

    }

    @PutMapping("/schedule/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable long id, @RequestBody Schedule schedule) {
    Schedule updatedSchedule = scheduleService.updateSchedule(id, schedule);
    return ResponseEntity.ok(updatedSchedule);

    
}
}
