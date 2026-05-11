package com.shaksham.portfolio.dto;

import lombok.Data;

@Data
public class AboutRequest {
    private String intro;
    private String summary;
    private String currentFocus;
    private String resumeUrl;
    private String profileImageUrl;
    private String location;
    private String phone;
    private String email;
    private String githubUrl;
    private String linkedinUrl;
    private String instagramUrl;
    private String whatsappNumber;
}
