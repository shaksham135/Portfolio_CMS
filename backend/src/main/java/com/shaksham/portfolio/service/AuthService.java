package com.shaksham.portfolio.service;

import com.shaksham.portfolio.dto.LoginRequest;
import com.shaksham.portfolio.dto.LoginResponse;
import com.shaksham.portfolio.entity.Admin;
import com.shaksham.portfolio.repository.AdminRepository;
import com.shaksham.portfolio.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final AdminRepository adminRepository;

    public LoginResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        Admin admin = (Admin) auth.getPrincipal();
        String token = jwtUtil.generateToken(admin);
        return new LoginResponse(token, admin.getUsername(), admin.getEmail(), admin.getRole());
    }
}
