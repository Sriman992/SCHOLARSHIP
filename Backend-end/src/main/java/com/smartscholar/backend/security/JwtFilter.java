package com.smartscholar.backend.security;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.smartscholar.backend.util.JwtUtil;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        System.out.println("🔍 Incoming request: " + req.getRequestURI());

        if (req.getRequestURI().startsWith("/auth")) {
            System.out.println("✅ Auth endpoint - skipping JWT validation");
            chain.doFilter(request, response);
            return;
        }

        String header = req.getHeader("Authorization");
        System.out.println("📋 Authorization header: " + header);

        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("❌ No valid Bearer token found");
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return;
        }

        String token = header.substring(7);

        try {
            Claims claims = JwtUtil.validateToken(token);
            System.out.println("✅ Token valid for: " + claims.getSubject());
            req.setAttribute("email", claims.getSubject());
            req.setAttribute("role", claims.get("role"));
            chain.doFilter(request, response);
        } catch (Exception e) {
            System.out.println("🚨 JWT ERROR: " + e.getMessage());
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
        }
    }
}