package vn.group16.gymtraining.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.group16.gymtraining.domain.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findScheduleByStartTimeAndEndTimeAndDate(String startTime, String endTime, LocalDate date);
}
