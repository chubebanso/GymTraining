package vn.group16.gymtraining.dto;

import java.util.HashSet;
import java.util.Set;

import vn.group16.gymtraining.domain.MuscleGroup;
public class WorkoutDTO {

    private String name;
    private String description;
    private String image;
    private int duration;
    private int calories;
    private String category;
    private Set<MuscleGroup> muscleGroups = new HashSet<>();
    private String difficultyLevel;

    //constructor
    public WorkoutDTO(String name, String description, String image, int duration, int calories, String category, Set<MuscleGroup> muscleGroups, String difficultyLevel) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.duration = duration;
        this.calories = calories;
        this.category = category;
        this.muscleGroups = muscleGroups;
        this.difficultyLevel = difficultyLevel;
    }
    

    // Getters and Setters
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
    // public List<Long> getMuscleGroups() {
    //     return muscleGroups;
    // }

    // public void setMuscleGroups(List<Long> muscleGroups) {
    //     this.muscleGroups = muscleGroups;
    // }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
}
