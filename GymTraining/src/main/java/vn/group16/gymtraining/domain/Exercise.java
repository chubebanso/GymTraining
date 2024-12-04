package vn.group16.gymtraining.domain;

import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "exercises")

public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Exercise name cannot be blank")
    @Size(min = 2, max = 100, message = "Exercise name must be between 2 and 100 characters")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Muscle group cannot be null")
    private MuscleGroup muscleGroup;

    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficultyLevel;

    @Min(value = 0, message = "Calories burned must be non-negative")
    private Integer caloriesBurned;

    private String videoUrl;
    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "exercise_equipment", joinColumns = @JoinColumn(name = "exercise_id"))
    @Column(name = "equipment")
    private Set<String> requiredEquipment;

    @Min(value = 0, message = "Recommended sets must be non-negative")
    private Integer recommendedSets;

    @Min(value = 0, message = "Recommended reps must be non-negative")
    private Integer recommendedReps;

    private Duration recommendedDuration;

    // Enums for classification
    public enum MuscleGroup {
        CHEST,
        BACK,
        SHOULDERS,
        BICEPS,
        TRICEPS,
        LEGS,
        CORE,
        FULL_BODY
    }

    public enum DifficultyLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        EXPERT
    }

    // Validation method
    public boolean isValidExercise() {
        return name != null && !name.trim().isEmpty() 
               && muscleGroup != null 
               && (recommendedSets == null || recommendedSets > 0)
               && (recommendedReps == null || recommendedReps > 0);
    }

    // Helper method to add equipment
    public void addEquipment(String equipment) {
        if (requiredEquipment == null) {
            requiredEquipment = new HashSet<>();
        }
        requiredEquipment.add(equipment);
    }

    // Calculate exercise intensity
    public DifficultyLevel calculateIntensity() {
        if (difficultyLevel != null) {
            return difficultyLevel;
        }
        
        // Default intensity calculation logic
        if (recommendedSets != null && recommendedReps != null) {
            int totalVolume = recommendedSets * recommendedReps;
            if (totalVolume <= 10) return DifficultyLevel.BEGINNER;
            if (totalVolume <= 20) return DifficultyLevel.INTERMEDIATE;
            if (totalVolume <= 30) return DifficultyLevel.ADVANCED;
            return DifficultyLevel.EXPERT;
        }
        
        return DifficultyLevel.BEGINNER;
    }
}