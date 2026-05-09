package com.shaksham.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String icon; // icon name or URL

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillCategory category;

    @Builder.Default
    private Integer level = 80; // 0-100 proficiency

    @Builder.Default
    private Integer displayOrder = 0;

    public enum SkillCategory {
        BACKEND, FRONTEND, DATABASE, TOOLS
    }
}
