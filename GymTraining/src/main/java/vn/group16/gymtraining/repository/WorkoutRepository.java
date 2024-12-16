package vn.group16.gymtraining.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vn.group16.gymtraining.domain.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<List<Workout>> findWorkoutByCategory(String category);

    Optional<List<Workout>> findWorkoutByDifficultyLevel(String difficultyLevel);

    List<Workout> findByIdIn(List<Long> workoutIds);

}