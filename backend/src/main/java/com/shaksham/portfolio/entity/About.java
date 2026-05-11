package com.shaksham.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "about")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String intro;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(columnDefinition = "TEXT")
    private String currentFocus;

    private String resumeUrl;

    private String profileImageUrl;

    private String location;

    private String phone;

    private String email;

    // Social links
    private String githubUrl;
    private String linkedinUrl;
    private String instagramUrl;
    private String whatsappNumber;
}
