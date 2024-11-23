package vn.group16.gymtraining.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    public ResponseEntity<Schedule> getSchedule(@RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime, @RequestParam("date") LocalDate date) {

        return ResponseEntity.ok(this.scheduleService.getScheduleByTime(startTime, endTime, date));
    }

    @GetMapping("/get-all-event")
    public ResponseEntity<List<EventDTO>> getSchedules() {
        List<EventDTO> events = scheduleService.getAllEvents();
        return ResponseEntity.ok(events);
    }
}
