package com.smartscholar.backend.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.smartscholar.backend.util.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        System.out.println("🔍 Incoming request: " + req.getRequestURI());

        // Skip auth endpoints
        if (req.getRequestURI().startsWith("/auth")) {
            chain.doFilter(req, res);
            return;
        }

        String header = req.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing token");
            return;
        }

        String token = header.substring(7);

        try {
            Claims claims = JwtUtil.validateToken(token);

            String email = claims.getSubject();

            // 🔥 THIS IS THE CRITICAL PART
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

            SecurityContextHolder.getContext().setAuthentication(auth);

            System.out.println("✅ Authenticated user: " + email);

            chain.doFilter(req, res);

        } catch (Exception e) {
            System.out.println("🚨 JWT ERROR: " + e.getMessage());
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        }
    }
}