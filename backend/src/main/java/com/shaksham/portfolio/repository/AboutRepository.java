package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.About;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AboutRepository extends JpaRepository<About, Long> {
    Optional<About> findFirstByOrderByIdAsc();
}
