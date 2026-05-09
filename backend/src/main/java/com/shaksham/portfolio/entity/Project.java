package com.shaksham.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "JSON")
    private String techStack; // JSON array of strings

    @Column(columnDefinition = "JSON")
    private String features; // JSON array of strings

    private String githubUrl;
    private String liveUrl;
    private String thumbnailUrl;

    @Column(columnDefinition = "JSON")
    private String screenshots; // JSON array of URLs

    @Builder.Default
    private Boolean featured = false;

    private String category; // e.g. "Backend", "Full Stack", "Frontend"

    @Builder.Default
    private Integer displayOrder = 0;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
