package com.shaksham.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjectRequest {
    @NotBlank(message = "Title is required")
    private String title;
    private String description;
    private String techStack; // JSON array string
    private String features; // JSON array string
    private String githubUrl;
    private String liveUrl;
    private String thumbnailUrl;
    private String screenshots; // JSON array string
    private Boolean featured = false;
    private String category;
    private Integer displayOrder = 0;
}
