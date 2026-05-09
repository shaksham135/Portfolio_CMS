package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.SkillRequest;
import com.shaksham.portfolio.entity.Skill;
import com.shaksham.portfolio.entity.Skill.SkillCategory;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAll() {
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Map<String, List<Skill>> getGrouped() {
        Map<String, List<Skill>> grouped = new LinkedHashMap<>();
        for (SkillCategory cat : SkillCategory.values()) {
            List<Skill> skills = skillRepository.findByCategoryOrderByDisplayOrderAsc(cat);
            if (!skills.isEmpty()) grouped.put(cat.name(), skills);
        }
        return grouped;
    }

    public Skill create(SkillRequest req) {
        Skill skill = Skill.builder()
                .name(req.getName())
                .icon(req.getIcon())
                .category(SkillCategory.valueOf(req.getCategory().toUpperCase()))
                .level(req.getLevel() != null ? req.getLevel() : 80)
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return skillRepository.save(skill);
    }

    public Skill update(Long id, SkillRequest req) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", id));
        skill.setName(req.getName());
        skill.setIcon(req.getIcon());
        skill.setCategory(SkillCategory.valueOf(req.getCategory().toUpperCase()));
        if (req.getLevel() != null) skill.setLevel(req.getLevel());
        if (req.getDisplayOrder() != null) skill.setDisplayOrder(req.getDisplayOrder());
        return skillRepository.save(skill);
    }

    public void delete(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", id));
        skillRepository.delete(skill);
    }
}
