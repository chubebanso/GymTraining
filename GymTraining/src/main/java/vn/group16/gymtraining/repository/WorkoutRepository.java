package vn.group16.gymtraining.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vn.group16.gymtraining.domain.Workout;

import java.util.List;


public interface WorkoutRepository extends JpaRepository<Workout, Long> {
        List<Workout> findByNameContaining(String name);
    }

