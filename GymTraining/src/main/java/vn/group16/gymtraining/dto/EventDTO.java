package vn.group16.gymtraining.dto;

public class EventDTO {
    public String title;
    public String start;
    public String end;

    public EventDTO(String title, String start, String end) {
        this.start = start;
        this.end = end;
        this.title = title;
    }

}
