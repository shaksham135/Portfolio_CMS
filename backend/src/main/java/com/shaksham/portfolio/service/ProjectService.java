package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.ProjectRequest;
import com.shaksham.portfolio.entity.Project;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAll() {
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Project> getFeatured() {
        return projectRepository.findByFeaturedTrueOrderByDisplayOrderAsc();
    }

    public List<Project> getByCategory(String category) {
        return projectRepository.findByCategoryOrderByDisplayOrderAsc(category);
    }

    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", id));
    }

    public Project create(ProjectRequest req) {
        Project project = Project.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .techStack(req.getTechStack())
                .features(req.getFeatures())
                .githubUrl(req.getGithubUrl())
                .liveUrl(req.getLiveUrl())
                .thumbnailUrl(req.getThumbnailUrl())
                .screenshots(req.getScreenshots())
                .featured(req.getFeatured() != null ? req.getFeatured() : false)
                .category(req.getCategory())
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return projectRepository.save(project);
    }

    public Project update(Long id, ProjectRequest req) {
        Project project = getById(id);
        project.setTitle(req.getTitle());
        project.setDescription(req.getDescription());
        project.setTechStack(req.getTechStack());
        project.setFeatures(req.getFeatures());
        project.setGithubUrl(req.getGithubUrl());
        project.setLiveUrl(req.getLiveUrl());
        project.setThumbnailUrl(req.getThumbnailUrl());
        project.setScreenshots(req.getScreenshots());
        if (req.getFeatured() != null) project.setFeatured(req.getFeatured());
        project.setCategory(req.getCategory());
        if (req.getDisplayOrder() != null) project.setDisplayOrder(req.getDisplayOrder());
        return projectRepository.save(project);
    }

    public void delete(Long id) {
        Project project = getById(id);
        projectRepository.delete(project);
    }
}
