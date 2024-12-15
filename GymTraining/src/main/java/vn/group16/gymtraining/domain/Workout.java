package vn.group16.gymtraining.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "workout")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    private String image;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private Integer calories;

    @Column(nullable = false)
    private String category;

    @ElementCollection // To store a list of strings (muscle groups)
    @CollectionTable(name = "workout_muscle_groups", joinColumns = @JoinColumn(name = "workout_id"))
    @Column(name = "muscle_group")
    private List<String> muscleGroups = new ArrayList<>();

    @Column(nullable = false)
    private String difficultyLevel;

    // Many-to-Many relationship with Schedule
    @ManyToMany(mappedBy = "workouts", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Schedule> schedules = new ArrayList<>();

    @OneToMany(mappedBy = "workout")
    private List<Exercise> exercises = new ArrayList<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getMuscleGroups() {
        return muscleGroups;
    }

    public void setMuscleGroups(List<String> muscleGroups) {
        this.muscleGroups = muscleGroups;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<Schedule> schedules) {
        this.schedules = schedules;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }

    // Convenience method to add a schedule
    public void addSchedule(Schedule schedule) {
        if (schedule != null && !this.schedules.contains(schedule)) {
            this.schedules.add(schedule);
            schedule.addWorkout(this);
        }
    }

    // Convenience method to remove a schedule
    public void removeSchedule(Schedule schedule) {
        if (schedule != null) {
            this.schedules.remove(schedule);
            schedule.removeWorkout(this);
        }
    }

    // Convenience method to add an exercise
    public void addExercise(Exercise exercise) {
        if (exercise != null) {
            this.exercises.add(exercise);
            exercise.setWorkout(this);
        }
    }
}