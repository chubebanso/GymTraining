package vn.group16.gymtraining.dto;

public class DurationStatDTO {
    private int day;
    private int totalDuration;

    public DurationStatDTO(int day, int totalDuration) {
        this.day = day;
        this.totalDuration = totalDuration;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(int totalDuration) {
        this.totalDuration = totalDuration;
    }
}
