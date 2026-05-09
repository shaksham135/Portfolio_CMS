package com.shaksham.portfolio.dto;

import lombok.Data;

@Data
public class SkillRequest {
    private String name;
    private String icon;
    private String category; // BACKEND, FRONTEND, DATABASE, TOOLS
    private Integer level = 80;
    private Integer displayOrder = 0;
}
