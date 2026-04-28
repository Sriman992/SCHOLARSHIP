package com.smartscholar.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test-secure")
    public String test() {
        return "Secure endpoint working";
    }
}
