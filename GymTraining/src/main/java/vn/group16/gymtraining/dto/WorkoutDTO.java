package vn.group16.gymtraining.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import vn.group16.gymtraining.domain.Workout;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDTO {
    private Long id;
    private String name;
    private String description;
    private String image;
    private Integer duration;
    private Integer caloriesBurned;
    private Long scheduleId;

    public WorkoutDTO(Workout workout) {
        this.id = workout.getId();
        this.name = workout.getName();
        this.description = workout.getDescription();
        this.image = workout.getImage();
        this.scheduleId = workout.getSchedule().getId();
        this.duration = workout.getDuration();
        this.caloriesBurned = workout.getCalories();
    }
}