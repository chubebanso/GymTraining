package vn.group16.gymtraining.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String startTime;
    private String endTime;
    private LocalDate date;
    private String title;

    @ManyToMany
    @JoinTable(name = "schedule_workout", joinColumns = @JoinColumn(name = "schedule_id"), inverseJoinColumns = @JoinColumn(name = "workout_id"))

    private List<Workout> workouts = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "schedule_completed_workout", joinColumns = @JoinColumn(name = "schedule_id"), inverseJoinColumns = @JoinColumn(name = "workout_id"))

    private List<Workout> completedWorkouts = new ArrayList<>();

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }

    public List<Workout> getCompletedWorkouts() {
        return completedWorkouts;
    }

    public void setCompletedWorkouts(List<Workout> completedWorkouts) {
        this.completedWorkouts = completedWorkouts;
    }

    // Convenience methods
    public void addWorkout(Workout workout) {
        if (workout != null && !this.workouts.contains(workout)) {
            this.workouts.add(workout);
            workout.getSchedules().add(this);
        }
    }

    public void removeWorkout(Workout workout) {
        if (workout != null) {
            this.workouts.remove(workout);
            workout.getSchedules().remove(this);
        }
    }

    public void addCompletedWorkout(Workout workout) {
        if (workout != null && !this.completedWorkouts.contains(workout)) {
            this.completedWorkouts.add(workout);
            workout.getSchedules().add(this);
        }
    }

    public void removeCompletedWorkout(Workout workout) {
        if (workout != null) {
            this.completedWorkouts.remove(workout);
            workout.getSchedules().remove(this);
        }
    }
}
