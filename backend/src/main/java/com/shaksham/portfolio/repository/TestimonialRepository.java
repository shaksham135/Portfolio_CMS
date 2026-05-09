package com.shaksham.portfolio.repository;

import com.shaksham.portfolio.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findAllByOrderByDisplayOrderAsc();
}
