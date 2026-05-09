package com.shaksham.portfolio.dto;

import lombok.Data;

@Data
public class ExperienceRequest {
    private String title;
    private String company;
    private String type; // INTERNSHIP, FREELANCE, LEARNING, JOB, PROJECT
    private String startDate; // yyyy-MM-dd
    private String endDate;   // yyyy-MM-dd or null
    private String description;
    private String location;
    private Integer displayOrder = 0;
}
