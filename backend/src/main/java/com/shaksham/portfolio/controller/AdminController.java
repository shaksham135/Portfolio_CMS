package com.shaksham.portfolio.controller;

import com.shaksham.portfolio.dto.*;
import com.shaksham.portfolio.entity.*;
import com.shaksham.portfolio.repository.*;
import com.shaksham.portfolio.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ProjectService projectService;
    private final SkillService skillService;
    private final ServiceItemService serviceItemService;
    private final ExperienceService experienceService;
    private final TestimonialService testimonialService;
    private final ContactService contactService;
    private final AboutService aboutService;
    private final ImageUploadService imageUploadService;

    // ===== STATS =====
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<ActivityDTO> activities = new java.util.ArrayList<>();
        
        // Add Messages
        contactService.getAllMessages().forEach(m -> {
            activities.add(ActivityDTO.builder()
                .id("msg-" + m.getId())
                .type("MESSAGE")
                .title("New message from " + m.getName())
                .timestamp(m.getCreatedAt())
                .icon("mail")
                .color("blue")
                .build());
        });

        // Add Projects
        projectService.getAll().forEach(p -> {
            activities.add(ActivityDTO.builder()
                .id("proj-" + p.getId())
                .type("PROJECT")
                .title("Project '" + p.getTitle() + "' added")
                .timestamp(p.getCreatedAt())
                .icon("plus") 
                .color("emerald")
                .build());
        });

        // Add Testimonials
        testimonialService.getAll().forEach(t -> {
            activities.add(ActivityDTO.builder()
                .id("test-" + t.getId())
                .type("TESTIMONIAL")
                .title("New testimonial from " + t.getName())
                .timestamp(t.getCreatedAt())
                .icon("star")
                .color("amber")
                .build());
        });

        // Sort by timestamp desc and take top 5
        List<ActivityDTO> recentActivities = activities.stream()
                .filter(a -> a.getTimestamp() != null) // in case some older records have null createdAt
                .sorted(java.util.Comparator.comparing(ActivityDTO::getTimestamp).reversed())
                .limit(5)
                .collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "projects", projectService.getAll().size(),
                "skills", skillService.getAll().size(),
                "testimonials", testimonialService.getAll().size(),
                "messages", contactService.getAllMessages().size(),
                "unreadMessages", contactService.getUnreadCount(),
                "activities", recentActivities
        ));
    }

    // ===== PROJECTS =====
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAll());
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody ProjectRequest req) {
        return ResponseEntity.ok(projectService.create(req));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody ProjectRequest req) {
        return ResponseEntity.ok(projectService.update(id, req));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, String>> deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Project deleted"));
    }

    // ===== SKILLS =====
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAll());
    }

    @PostMapping("/skills")
    public ResponseEntity<Skill> createSkill(@RequestBody SkillRequest req) {
        return ResponseEntity.ok(skillService.create(req));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @RequestBody SkillRequest req) {
        return ResponseEntity.ok(skillService.update(id, req));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Map<String, String>> deleteSkill(@PathVariable Long id) {
        skillService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Skill deleted"));
    }

    // ===== SERVICES =====
    @GetMapping("/services")
    public ResponseEntity<List<ServiceItem>> getAllServices() {
        return ResponseEntity.ok(serviceItemService.getAll());
    }

    @PostMapping("/services")
    public ResponseEntity<ServiceItem> createService(@RequestBody ServiceRequest req) {
        return ResponseEntity.ok(serviceItemService.create(req));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ServiceItem> updateService(@PathVariable Long id, @RequestBody ServiceRequest req) {
        return ResponseEntity.ok(serviceItemService.update(id, req));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Map<String, String>> deleteService(@PathVariable Long id) {
        serviceItemService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Service deleted"));
    }

    // ===== EXPERIENCE =====
    @GetMapping("/experience")
    public ResponseEntity<List<Experience>> getAllExperience() {
        return ResponseEntity.ok(experienceService.getAll());
    }

    @PostMapping("/experience")
    public ResponseEntity<Experience> createExperience(@RequestBody ExperienceRequest req) {
        return ResponseEntity.ok(experienceService.create(req));
    }

    @PutMapping("/experience/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable Long id, @RequestBody ExperienceRequest req) {
        return ResponseEntity.ok(experienceService.update(id, req));
    }

    @DeleteMapping("/experience/{id}")
    public ResponseEntity<Map<String, String>> deleteExperience(@PathVariable Long id) {
        experienceService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Experience deleted"));
    }

    // ===== TESTIMONIALS =====
    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @PostMapping("/testimonials")
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody TestimonialRequest req) {
        return ResponseEntity.ok(testimonialService.create(req));
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(@PathVariable Long id, @RequestBody TestimonialRequest req) {
        return ResponseEntity.ok(testimonialService.update(id, req));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Map<String, String>> deleteTestimonial(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Testimonial deleted"));
    }

    // ===== MESSAGES =====
    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }

    @PatchMapping("/messages/{id}/read")
    public ResponseEntity<ContactMessage> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Message deleted"));
    }

    // ===== ABOUT =====
    @GetMapping("/about")
    public ResponseEntity<About> getAbout() {
        return ResponseEntity.ok(aboutService.get());
    }

    @PutMapping("/about")
    public ResponseEntity<About> updateAbout(@RequestBody AboutRequest req) {
        return ResponseEntity.ok(aboutService.upsert(req));
    }

    // ===== IMAGE UPLOAD =====
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "general") String folder) throws Exception {
        String url = imageUploadService.uploadImage(file, folder);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
