package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.Skill;
import com.shaksham.portfolio.entity.Skill.SkillCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByDisplayOrderAsc();
    List<Skill> findByCategoryOrderByDisplayOrderAsc(SkillCategory category);
}
