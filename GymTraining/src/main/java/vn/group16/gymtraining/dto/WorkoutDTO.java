package vn.group16.gymtraining.dto;

import java.util.List;

public class WorkoutDTO {

    private String name;
    private String description;
    private String image;
    private int duration;
    private int calories;
    private String category;
    private List<String> muscleGroups;  // Danh sách nhóm cơ
    private String difficultyLevel;

    // Constructor
    public WorkoutDTO(String name, String description, String image, int duration, int calories, 
                      String category, List<String> muscleGroups, String difficultyLevel) {
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
}
