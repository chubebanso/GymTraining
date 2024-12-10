package vn.group16.gymtraining.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.group16.gymtraining.domain.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    // Find workouts by name (case-insensitive)
    List<Workout> findByNameContainingIgnoreCase(String name);
    
    // Find workouts by schedule ID
    List<Workout> findByScheduleId(Long scheduleId);

    // Find workouts by name
    Optional<Workout> findByName(String name);
}