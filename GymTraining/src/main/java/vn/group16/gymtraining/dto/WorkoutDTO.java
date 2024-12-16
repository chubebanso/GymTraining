package vn.group16.gymtraining.dto;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import vn.group16.gymtraining.domain.Exercise;
import vn.group16.gymtraining.domain.MuscleGroup;

public class WorkoutDTO {
    private Long id; // Thêm trường ID
    private String name;
    private String description;
    private String image;
    private int duration;
    private int calories;
    private String category;
    private Set<MuscleGroup> muscleGroups = new HashSet<>();
    private String difficultyLevel;
    private List<Exercise> exercises;
    private String videoUrl;

    // Constructor bao gồm ID
    public WorkoutDTO(Long id, String name, String description, String image, String videoUrl, int duration,
            int calories, String category, Set<MuscleGroup> muscleGroups,
            String difficultyLevel, List<Exercise> exercises) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.duration = duration;
        this.videoUrl = videoUrl;
        this.calories = calories;
        this.category = category;
        this.muscleGroups = muscleGroups;
        this.difficultyLevel = difficultyLevel;
        this.exercises = exercises;
    }

    public WorkoutDTO() {
        // Default constructor
    }

    // Getters và Setters
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Set<MuscleGroup> getMuscleGroups() {
        return muscleGroups;
    }

    public void setMuscleGroups(Set<MuscleGroup> muscleGroups) {
        this.muscleGroups = muscleGroups;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercise) {
        this.exercises = exercise;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
