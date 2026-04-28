package com.smartscholar.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smartscholar.backend.model.Application;
import com.smartscholar.backend.service.ApplicationService;
import com.smartscholar.backend.util.JwtUtil;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/applications")
@CrossOrigin
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // APPLY
    @PostMapping
    public ResponseEntity<Application> apply(@RequestBody Application application) {
        return ResponseEntity.ok(applicationService.apply(application));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Application>> getAll() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // UPDATE STATUS (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestHeader("Authorization") String header) {

        try {
            // 🔥 Extract token
            String token = header.substring(7);

            // 🔥 Validate token
            Claims claims = JwtUtil.validateToken(token);

            String role = claims.get("role", String.class);

            // 🔥 Role check
            if (!role.equals("ADMIN")) {
                return ResponseEntity.status(403).body("Access denied");
            }

            // ✅ Actual update
            Application updated = applicationService.updateStatus(id, status);

            return ResponseEntity.ok(updated);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
    // FILTER
    @GetMapping("/student/{name}")
    public ResponseEntity<List<Application>> getByStudent(@PathVariable String name) {
        return ResponseEntity.ok(applicationService.getByStudent(name));
    }

    // 🧪 TEST ENDPOINT
    @GetMapping("/test-secure")
    public ResponseEntity<String> testSecure(jakarta.servlet.http.HttpServletRequest request) {
        Object email = request.getAttribute("email");
        Object role = request.getAttribute("role");

        if (email == null) {
            return ResponseEntity.status(401).body("❌ Token not parsed - no email attribute found");
        }

        return ResponseEntity.ok("✅ Success! Email: " + email + ", Role: " + role);
    }
}