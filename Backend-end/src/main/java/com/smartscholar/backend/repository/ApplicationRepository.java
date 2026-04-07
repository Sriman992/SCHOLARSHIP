package com.smartscholar.backend.repository;

import com.smartscholar.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Custom Queries
    List<Application> findByStudentName(String studentName);

    List<Application> findByStatus(String status);
}