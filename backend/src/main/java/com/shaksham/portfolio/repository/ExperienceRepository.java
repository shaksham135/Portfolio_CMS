package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByOrderByDisplayOrderAsc();
}
