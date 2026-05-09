package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.ExperienceRequest;
import com.shaksham.portfolio.entity.Experience;
import com.shaksham.portfolio.entity.Experience.ExperienceType;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public List<Experience> getAll() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Experience create(ExperienceRequest req) {
        Experience exp = Experience.builder()
                .title(req.getTitle())
                .company(req.getCompany())
                .type(req.getType() != null ? ExperienceType.valueOf(req.getType().toUpperCase()) : null)
                .startDate(req.getStartDate() != null ? LocalDate.parse(req.getStartDate()) : null)
                .endDate(req.getEndDate() != null ? LocalDate.parse(req.getEndDate()) : null)
                .description(req.getDescription())
                .location(req.getLocation())
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return experienceRepository.save(exp);
    }

    public Experience update(Long id, ExperienceRequest req) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", id));
        exp.setTitle(req.getTitle());
        exp.setCompany(req.getCompany());
        if (req.getType() != null) exp.setType(ExperienceType.valueOf(req.getType().toUpperCase()));
        if (req.getStartDate() != null) exp.setStartDate(LocalDate.parse(req.getStartDate()));
        exp.setEndDate(req.getEndDate() != null ? LocalDate.parse(req.getEndDate()) : null);
        exp.setDescription(req.getDescription());
        exp.setLocation(req.getLocation());
        if (req.getDisplayOrder() != null) exp.setDisplayOrder(req.getDisplayOrder());
        return experienceRepository.save(exp);
    }

    public void delete(Long id) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience", id));
        experienceRepository.delete(exp);
    }
}
