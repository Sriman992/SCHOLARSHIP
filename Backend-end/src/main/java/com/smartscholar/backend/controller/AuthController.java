package com.smartscholar.backend.controller;

import com.smartscholar.backend.model.User;
import com.smartscholar.backend.repository.UserRepository;
import com.smartscholar.backend.service.UserService;
import com.smartscholar.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // LOGIN → returns JWT with user data
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        User user = userService.login(request.getEmail(), request.getPassword());

        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = JwtUtil.generateToken(user.getEmail(), user.getRole());

        // Return as JSON object so frontend can parse it correctly
        return ResponseEntity.ok(new java.util.HashMap<>() {{
            put("token", token);
            put("role", user.getRole());
            put("email", user.getEmail());
        }});
    }

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
}