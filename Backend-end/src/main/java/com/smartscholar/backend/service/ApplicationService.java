package com.smartscholar.backend.service;

import com.smartscholar.backend.exception.ResourceNotFoundException;
import com.smartscholar.backend.model.Application;
import com.smartscholar.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    // APPLY
    public Application apply(Application application) {
        application.setStatus("Pending");
        return applicationRepository.save(application);
    }

    // GET ALL
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // UPDATE STATUS (Admin)
    public Application updateStatus(Long id, String status) {
        Optional<Application> app = applicationRepository.findById(id);

        if (app.isPresent()) {
            Application application = app.get();
            application.setStatus(status);
            return applicationRepository.save(application);
        }
        throw new ResourceNotFoundException("Application not found with id " + id);
    }

    // FILTER
    public List<Application> getByStudent(String name) {
        return applicationRepository.findByStudentName(name);
    }
}