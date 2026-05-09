package com.shaksham.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String role;
    private String company;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private String imageUrl;

    @Builder.Default
    private Integer rating = 5; // 1-5

    @Builder.Default
    private Integer displayOrder = 0;

    @Column(updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
    }
}
