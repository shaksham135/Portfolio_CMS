package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAsc();
    List<Project> findByFeaturedTrueOrderByDisplayOrderAsc();
    List<Project> findByCategoryOrderByDisplayOrderAsc(String category);
}
