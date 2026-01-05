package com.teju.JobAppBackend.controller;

import com.teju.JobAppBackend.service.JobAIService;
import com.teju.JobAppBackend.service.JobService;
import com.teju.JobAppBackend.model.JobPost;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class JobAIController {

    @Autowired
    private JobAIService aiService;

    @Autowired
    private JobService jobService;

    // Generate job description
    @PostMapping("/generate-description")
    public ResponseEntity<Map<String, String>> generateDescription(
            @RequestBody Map<String, String> request) {
        try {
            String jobTitle = request.get("jobTitle");
            String skills = request.get("skills");

            if (jobTitle == null || skills == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "jobTitle and skills are required"
                ));
            }

            String description = aiService.generateJobDescription(jobTitle, skills);
            return ResponseEntity.ok(Map.of("description", description));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to generate description: " + e.getMessage()
            ));
        }
    }

    // Match candidate to job
    @PostMapping("/match-candidate/{jobId}")
    public ResponseEntity<Map<String, String>> matchCandidate(
            @PathVariable int jobId,
            @RequestBody Map<String, String> request) {
        try {
            JobPost job = jobService.getJobById(jobId);
            if (job == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Job not found"));
            }

            String candidateSkills = request.get("skills");
            if (candidateSkills == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "skills are required"));
            }

            String analysis = aiService.matchCandidateToJob(candidateSkills, job);
            return ResponseEntity.ok(Map.of("analysis", analysis));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to analyze match: " + e.getMessage()
            ));
        }
    }

    // Get job recommendations
    @PostMapping("/recommend-jobs")
    public ResponseEntity<Map<String, String>> recommendJobs(
            @RequestBody Map<String, String> request) {
        try {
            String userProfile = request.get("profile");
            if (userProfile == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "profile is required"));
            }

            String recommendations = aiService.getJobRecommendations(
                    userProfile,
                    jobService.getAllJobs()
            );
            return ResponseEntity.ok(Map.of("recommendations", recommendations));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to get recommendations: " + e.getMessage()
            ));
        }
    }

    // Improve job posting
    @GetMapping("/improve-posting/{jobId}")
    public Map<String, String> improvePosting(@PathVariable int jobId) {
        JobPost job = jobService.getJobById(jobId);
        if (job == null) {
            return Map.of("error", "Job not found");
        }

        String suggestions = aiService.improveJobPosting(job);
        return Map.of("suggestions", suggestions);
    }

    // Ask question about a job
    @PostMapping("/ask/{jobId}")
    public Map<String, String> askAboutJob(
            @PathVariable int jobId,
            @RequestBody Map<String, String> request) {

        JobPost job = jobService.getJobById(jobId);
        if (job == null) {
            return Map.of("error", "Job not found");
        }

        String question = request.get("question");
        String answer = aiService.askAboutJob(job, question);
        return Map.of("answer", answer);
    }
}