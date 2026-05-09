package com.shaksham.portfolio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {
    private String id;
    private String type; // MESSAGE, PROJECT, TESTIMONIAL
    private String title;
    private LocalDateTime timestamp;
    private String icon;
    private String color;
}
