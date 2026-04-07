package com.smartscholar.backend.repository;

import com.smartscholar.backend.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {

    // Derived Query Methods (Skill 8)
    List<Scholarship> findByCategory(String category);

    List<Scholarship> findByAmountGreaterThan(double amount);

    List<Scholarship> findByTitleContainingIgnoreCase(String title);
}