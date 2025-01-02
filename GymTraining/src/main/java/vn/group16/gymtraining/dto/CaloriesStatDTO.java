package vn.group16.gymtraining.dto;

public class CaloriesStatDTO {
    private int day;
    private int totalCalories;

    public CaloriesStatDTO(int day, int totalCalories) {
        this.day = day;
        this.totalCalories = totalCalories;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(int totalCalories) {
        this.totalCalories = totalCalories;
    }
}
