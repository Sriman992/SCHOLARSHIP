package com.smartscholar.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "scholarships")
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private double amount;
    private String category;
    private LocalDate deadline;

    // Default Constructor
    public Scholarship() {}

    // Parameterized Constructor
    public Scholarship(String title, String description, double amount, String category, LocalDate deadline) {
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.deadline = deadline;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
}