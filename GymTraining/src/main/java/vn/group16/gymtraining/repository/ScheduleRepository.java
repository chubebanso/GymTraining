package vn.group16.gymtraining.repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import vn.group16.gymtraining.domain.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<List<Schedule>> findScheduleByStartTimeAndEndTimeAndDate(String startTime, String endTime, LocalDate date);

    Optional<List<Schedule>> findScheduleByDate(LocalDate date);
}
