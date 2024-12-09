package vn.group16.gymtraining.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "workout_exercise")
public class WorkoutExercise {

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Long id;

    @Id
    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    @JsonBackReference
    Exercise exercise;

    @Id
    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    @JsonBackReference
    Workout workout;

    @Column(name = "sets")
    private String sets;

    // Getters và Setters

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public String getSets() {
        return sets;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }
}
