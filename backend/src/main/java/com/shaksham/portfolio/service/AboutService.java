package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.AboutRequest;
import com.shaksham.portfolio.entity.About;
import com.shaksham.portfolio.repository.AboutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AboutService {

    private final AboutRepository aboutRepository;

    public About get() {
        return aboutRepository.findFirstByOrderByIdAsc()
                .orElse(About.builder()
                        .intro("Hi, I'm Shaksham Agarwal")
                        .summary("Java Backend Developer & Full Stack Developer")
                        .currentFocus("Building scalable backend systems")
                        .build());
    }

    public About upsert(AboutRequest req) {
        About about = aboutRepository.findFirstByOrderByIdAsc().orElse(new About());
        about.setIntro(req.getIntro());
        about.setSummary(req.getSummary());
        about.setCurrentFocus(req.getCurrentFocus());
        about.setResumeUrl(req.getResumeUrl());
        about.setProfileImageUrl(req.getProfileImageUrl());
        about.setLocation(req.getLocation());
        about.setPhone(req.getPhone());
        about.setEmail(req.getEmail());
        about.setGithubUrl(req.getGithubUrl());
        about.setLinkedinUrl(req.getLinkedinUrl());
        about.setTwitterUrl(req.getTwitterUrl());
        about.setWhatsappNumber(req.getWhatsappNumber());
        return aboutRepository.save(about);
    }
}
