package vn.group16.gymtraining.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Schedule;
import vn.group16.gymtraining.dto.EventDTO;
import vn.group16.gymtraining.repository.ScheduleRepository;

@Service
public class ScheduleService {
    final private ScheduleRepository scheduleRepository;

    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
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
}
