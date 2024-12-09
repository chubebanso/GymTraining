package vn.group16.gymtraining.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Collection;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "workout")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    private String image;
    private int duration;
    private int calories;
    private String category;
    private String targetMuscle;
    private String level;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    @JsonBackReference
    Schedule schedule;

    @OneToMany(mappedBy = "workout")
    // @JoinColumn(name = "workout_id")
    @JsonManagedReference
    private List<WorkoutExercise> workoutExercises;

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTargetMuscle() {
        return targetMuscle;
    }

    public void setTargetMuscle(String targetMuscle) {
        this.targetMuscle = targetMuscle;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Collection<Workout> getWorkoutExercises() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getWorkoutExercises'");
    }
}