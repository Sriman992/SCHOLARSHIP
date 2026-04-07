package com.smartscholar.backend.controller;

import com.smartscholar.backend.model.Scholarship;
import com.smartscholar.backend.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scholarships")
@CrossOrigin
public class ScholarshipController {

    @Autowired
    private ScholarshipService scholarshipService;

    // CREATE
    @PostMapping
    public ResponseEntity<Scholarship> addScholarship(@RequestBody Scholarship scholarship) {
        return ResponseEntity.ok(scholarshipService.addScholarship(scholarship));
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Scholarship>> getAllScholarships() {
        return ResponseEntity.ok(scholarshipService.getAllScholarships());
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getScholarshipById(@PathVariable Long id) {
        Scholarship scholarship = scholarshipService.getScholarshipById(id);
        return ResponseEntity.ok(scholarship);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Scholarship> updateScholarship(
            @PathVariable Long id,
            @RequestBody Scholarship scholarship) {
        return ResponseEntity.ok(scholarshipService.updateScholarship(id, scholarship));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScholarship(@PathVariable Long id) {
        scholarshipService.deleteScholarship(id);
        return ResponseEntity.ok("Scholarship deleted successfully");
    }

    // FILTER
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Scholarship>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(scholarshipService.getByCategory(category));
    }

    // SEARCH
    @GetMapping("/search")
    public ResponseEntity<List<Scholarship>> search(@RequestParam String title) {
        return ResponseEntity.ok(scholarshipService.searchByTitle(title));
    }
}