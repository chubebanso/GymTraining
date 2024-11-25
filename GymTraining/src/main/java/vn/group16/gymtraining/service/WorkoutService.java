package vn.group16.gymtraining.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.group16.gymtraining.domain.Workout;
import vn.group16.gymtraining.repository.WorkoutRepository;

import java.util.List;



@Service
public class WorkoutService {
    @Autowired
    final private WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public List<Workout> searchWorkoutsByName(String name) {
        return workoutRepository.findByNameContaining(name);
    }
}