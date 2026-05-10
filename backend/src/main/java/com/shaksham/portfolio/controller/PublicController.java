package com.shaksham.portfolio.controller;

import com.shaksham.portfolio.dto.ContactRequest;
import com.shaksham.portfolio.entity.*;
import com.shaksham.portfolio.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PublicController {

    private final ProjectService projectService;
    private final SkillService skillService;
    private final ServiceItemService serviceItemService;
    private final ExperienceService experienceService;
    private final TestimonialService testimonialService;
    private final ContactService contactService;
    private final AboutService aboutService;

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return ResponseEntity.ok(projectService.getByCategory(category));
        }
        return ResponseEntity.ok(projectService.getAll());
    }

    @GetMapping("/projects/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        return ResponseEntity.ok(projectService.getFeatured());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getById(id));
    }

    @GetMapping("/skills")
    public ResponseEntity<Map<String, List<com.shaksham.portfolio.entity.Skill>>> getSkills() {
        return ResponseEntity.ok(skillService.getGrouped());
    }

    @GetMapping("/services")
    public ResponseEntity<List<com.shaksham.portfolio.entity.ServiceItem>> getServices() {
        return ResponseEntity.ok(serviceItemService.getAll());
    }

    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getExperience() {
        return ResponseEntity.ok(experienceService.getAll());
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getTestimonials() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @GetMapping("/about")
    public ResponseEntity<About> getAbout() {
        return ResponseEntity.ok(aboutService.get());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactRequest req) {
        contactService.submitMessage(req);
        return ResponseEntity.ok(Map.of("message", "Thank you! Your message has been received."));
    }
}
