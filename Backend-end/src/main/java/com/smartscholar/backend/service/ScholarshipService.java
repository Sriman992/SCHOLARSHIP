package com.smartscholar.backend.service;

import com.smartscholar.backend.exception.ResourceNotFoundException;
import com.smartscholar.backend.model.Scholarship;
import com.smartscholar.backend.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipService {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    // CREATE
    public Scholarship addScholarship(Scholarship scholarship) {
        return scholarshipRepository.save(scholarship);
    }

    // READ ALL
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }

    // READ BY ID
    public Scholarship getScholarshipById(Long id) {
        Optional<Scholarship> scholarship = scholarshipRepository.findById(id);
        return scholarship.orElseThrow(() ->
        new ResourceNotFoundException("Scholarship not found with id " + id));
    }

    // UPDATE
    public Scholarship updateScholarship(Long id, Scholarship updatedScholarship) {
        Scholarship existing = getScholarshipById(id);
        if (existing != null) {
            existing.setTitle(updatedScholarship.getTitle());
            existing.setDescription(updatedScholarship.getDescription());
            existing.setAmount(updatedScholarship.getAmount());
            existing.setCategory(updatedScholarship.getCategory());
            existing.setDeadline(updatedScholarship.getDeadline());
            return scholarshipRepository.save(existing);
        }
        return null;
    }

    // DELETE
    public void deleteScholarship(Long id) {
        scholarshipRepository.deleteById(id);
    }

    // FILTER METHODS
    public List<Scholarship> getByCategory(String category) {
        return scholarshipRepository.findByCategory(category);
    }

    public List<Scholarship> searchByTitle(String title) {
        return scholarshipRepository.findByTitleContainingIgnoreCase(title);
    }
}