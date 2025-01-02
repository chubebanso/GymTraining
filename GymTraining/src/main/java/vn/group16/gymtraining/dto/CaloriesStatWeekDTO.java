package vn.group16.gymtraining.dto;

public class CaloriesStatWeekDTO {
    private int day;
    private int totalCaloriesInLastWeek;
    private int totalCaloriesInThisWeek;

    public CaloriesStatWeekDTO(int day, int totalCaloriesInLastWeek, int totalCaloriesInThisWeek) {
        this.day = day;
        this.totalCaloriesInLastWeek = totalCaloriesInLastWeek;
        this.totalCaloriesInThisWeek = totalCaloriesInThisWeek;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getTotalCaloriesInLastWeek() {
        return totalCaloriesInLastWeek;
    }

    public void setTotalCaloriesInLastWeek(int totalCaloriesInLastWeek) {
        this.totalCaloriesInLastWeek = totalCaloriesInLastWeek;
    }

    public int getTotalCaloriesInThisWeek() {
        return totalCaloriesInThisWeek;
    }

    public void setTotalCaloriesInThisWeek(int totalCaloriesInThisWeek) {
        this.totalCaloriesInThisWeek = totalCaloriesInThisWeek;
    }

    
}
