package com.shaksham.portfolio.dto;

import lombok.Data;

@Data
public class TestimonialRequest {
    private String name;
    private String role;
    private String company;
    private String message;
    private String imageUrl;
    private Integer rating = 5;
    private Integer displayOrder = 0;
}
