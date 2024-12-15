package vn.group16.gymtraining.domain;

import jakarta.persistence.Column;


public class MuscleGroup {


    @Column(nullable = false)
    private String name; 
    

    public MuscleGroup() {}

    public MuscleGroup(String name) {
        this.name = name;
    }

    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
}
