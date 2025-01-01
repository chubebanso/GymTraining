package vn.group16.gymtraining.dto;

public class WorkoutCountStatDTO {
    private int day;
    private int count;
    
    public WorkoutCountStatDTO(int day, int count) {
        this.day = day;
        this.count = count;
    }
    
    // Getters and setters
    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}