package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.TestimonialRequest;
import com.shaksham.portfolio.entity.Testimonial;
import com.shaksham.portfolio.exception.ResourceNotFoundException;
import com.shaksham.portfolio.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public List<Testimonial> getAll() {
        return testimonialRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Testimonial create(TestimonialRequest req) {
        Testimonial t = Testimonial.builder()
                .name(req.getName())
                .role(req.getRole())
                .company(req.getCompany())
                .message(req.getMessage())
                .imageUrl(req.getImageUrl())
                .rating(req.getRating() != null ? req.getRating() : 5)
                .displayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : 0)
                .build();
        return testimonialRepository.save(t);
    }

    public Testimonial update(Long id, TestimonialRequest req) {
        Testimonial t = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial", id));
        t.setName(req.getName());
        t.setRole(req.getRole());
        t.setCompany(req.getCompany());
        t.setMessage(req.getMessage());
        t.setImageUrl(req.getImageUrl());
        if (req.getRating() != null) t.setRating(req.getRating());
        if (req.getDisplayOrder() != null) t.setDisplayOrder(req.getDisplayOrder());
        return testimonialRepository.save(t);
    }

    public void delete(Long id) {
        Testimonial t = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial", id));
        testimonialRepository.delete(t);
    }
}
