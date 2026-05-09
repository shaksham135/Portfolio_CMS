package com.shaksham.portfolio.dto;

import lombok.Data;

@Data
public class ServiceRequest {
    private String title;
    private String description;
    private String icon;
    private Integer displayOrder;
}
