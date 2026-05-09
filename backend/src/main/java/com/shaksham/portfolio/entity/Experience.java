package com.shaksham.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String company;

    @Enumerated(EnumType.STRING)
    private ExperienceType type;

    private LocalDate startDate;
    private LocalDate endDate; // null = present

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Builder.Default
    private Integer displayOrder = 0;

    public enum ExperienceType {
        INTERNSHIP, FREELANCE, LEARNING, JOB, PROJECT
    }
}
