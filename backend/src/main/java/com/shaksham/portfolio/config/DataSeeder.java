package com.shaksham.portfolio.config;

import com.shaksham.portfolio.entity.*;
import com.shaksham.portfolio.entity.Skill.SkillCategory;
import com.shaksham.portfolio.entity.Experience.ExperienceType;
import com.shaksham.portfolio.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Value;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    @Value("${app.admin.username}")
    private String adminUsername;
    
    @Value("${app.admin.password}")
    private String adminPassword;
    
    @Value("${app.admin.email}")
    private String adminEmail;

    private final AdminRepository adminRepository;
    private final SkillRepository skillRepository;
    private final ServiceRepository serviceRepository;
    private final ExperienceRepository experienceRepository;
    private final AboutRepository aboutRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        seedAbout();
        seedSkills();
        seedServices();
        seedExperience();
    }

    private void seedAdmin() {
        if (!adminRepository.existsByEmail(adminEmail)) {
            // Delete old admin if exists
            adminRepository.findByEmail("admin@shaksham.dev").ifPresent(oldAdmin -> {
                adminRepository.delete(oldAdmin);
                log.info("🗑️ Deleted old admin: admin@shaksham.dev");
            });
            
            Admin admin = Admin.builder()
                    .username(adminUsername)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role("ROLE_ADMIN")
                    .build();
            adminRepository.save(admin);
            log.info("✅ Default admin seeded: {}", adminEmail);
        }
    }

    private void seedAbout() {
        if (aboutRepository.count() == 0) {
            About about = About.builder()
                    .intro("Hi! I'm Shaksham Agarwal 👋")
                    .summary("A passionate Java Backend Developer & Full Stack Developer with expertise in building scalable, production-ready applications. I love creating elegant solutions to complex problems.")
                    .currentFocus("Building microservices with Spring Boot, exploring cloud-native architectures, and contributing to open source.")
                    .location("India")
                    .email("shaksham@email.com")
                    .githubUrl("https://github.com/shaksham")
                    .linkedinUrl("https://linkedin.com/in/shaksham")
                    .whatsappNumber("+91XXXXXXXXXX")
                    .build();
            aboutRepository.save(about);
            log.info("✅ About seeded");
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            // Backend
            skillRepository.save(Skill.builder().name("Java").icon("java").category(SkillCategory.BACKEND).level(90).displayOrder(1).build());
            skillRepository.save(Skill.builder().name("Spring Boot").icon("spring").category(SkillCategory.BACKEND).level(88).displayOrder(2).build());
            skillRepository.save(Skill.builder().name("Spring Security").icon("spring").category(SkillCategory.BACKEND).level(82).displayOrder(3).build());
            skillRepository.save(Skill.builder().name("REST APIs").icon("api").category(SkillCategory.BACKEND).level(90).displayOrder(4).build());
            skillRepository.save(Skill.builder().name("JWT").icon("jwt").category(SkillCategory.BACKEND).level(85).displayOrder(5).build());
            // Frontend
            skillRepository.save(Skill.builder().name("React").icon("react").category(SkillCategory.FRONTEND).level(82).displayOrder(1).build());
            skillRepository.save(Skill.builder().name("JavaScript").icon("javascript").category(SkillCategory.FRONTEND).level(85).displayOrder(2).build());
            skillRepository.save(Skill.builder().name("Tailwind CSS").icon("tailwind").category(SkillCategory.FRONTEND).level(80).displayOrder(3).build());
            skillRepository.save(Skill.builder().name("HTML/CSS").icon("html").category(SkillCategory.FRONTEND).level(90).displayOrder(4).build());
            // Database
            skillRepository.save(Skill.builder().name("MySQL").icon("mysql").category(SkillCategory.DATABASE).level(85).displayOrder(1).build());
            skillRepository.save(Skill.builder().name("PostgreSQL").icon("postgresql").category(SkillCategory.DATABASE).level(75).displayOrder(2).build());
            skillRepository.save(Skill.builder().name("Redis").icon("redis").category(SkillCategory.DATABASE).level(70).displayOrder(3).build());
            // Tools
            skillRepository.save(Skill.builder().name("Git").icon("git").category(SkillCategory.TOOLS).level(88).displayOrder(1).build());
            skillRepository.save(Skill.builder().name("Docker").icon("docker").category(SkillCategory.TOOLS).level(72).displayOrder(2).build());
            skillRepository.save(Skill.builder().name("Maven").icon("maven").category(SkillCategory.TOOLS).level(82).displayOrder(3).build());
            log.info("✅ Skills seeded");
        }
    }

    private void seedServices() {
        if (serviceRepository.count() == 0) {
            serviceRepository.save(ServiceItem.builder().title("Backend API Development").description("Scalable REST APIs with Spring Boot, JWT auth, and clean architecture.").icon("server").displayOrder(1).build());
            serviceRepository.save(ServiceItem.builder().title("Full Stack Web Apps").description("End-to-end web applications with React frontend and Java backend.").icon("globe").displayOrder(2).build());
            serviceRepository.save(ServiceItem.builder().title("Business Websites").description("Premium, responsive business websites with modern UI/UX.").icon("building").displayOrder(3).build());
            serviceRepository.save(ServiceItem.builder().title("Admin Dashboards").description("Feature-rich admin panels and CMS systems for managing content.").icon("layout").displayOrder(4).build());
            serviceRepository.save(ServiceItem.builder().title("Landing Pages").description("High-converting landing pages with animations and fast load times.").icon("zap").displayOrder(5).build());
            serviceRepository.save(ServiceItem.builder().title("UI Redesign").description("Transform outdated UIs into modern, premium designs.").icon("palette").displayOrder(6).build());
            log.info("✅ Services seeded");
        }
    }

    private void seedExperience() {
        if (experienceRepository.count() == 0) {
            experienceRepository.save(Experience.builder()
                    .title("Java Full Stack Development")
                    .company("Self-Learning")
                    .type(ExperienceType.LEARNING)
                    .startDate(LocalDate.of(2023, 1, 1))
                    .description("Mastered Java, Spring Boot, React, MySQL, and cloud deployment. Built 10+ projects.")
                    .displayOrder(1).build());
            experienceRepository.save(Experience.builder()
                    .title("Freelance Web Developer")
                    .company("Independent")
                    .type(ExperienceType.FREELANCE)
                    .startDate(LocalDate.of(2024, 1, 1))
                    .description("Built custom web solutions for small businesses including e-commerce stores and portfolios.")
                    .displayOrder(2).build());
            log.info("✅ Experience seeded");
        }
    }
}
