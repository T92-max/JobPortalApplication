package com.teju.JobAppBackend.controller;

import com.teju.JobAppBackend.model.JobPost;
import com.teju.JobAppBackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class JobRestController {

    @Autowired
    private JobService service;

    // Home endpoint
    @GetMapping("/")
    public String home() {
        return "Welcome to Job App Backend!";
    }

    // Get all jobs
    @GetMapping({"/jobPosts","/jobs"})
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

    // Get job by ID
    @GetMapping("/jobPost/{postId}")
    public JobPost getJobById(@PathVariable int postId) {
        return service.getJobById(postId);
    }

    // Add new job
    @PostMapping("/jobPost")
    public JobPost addJob(@RequestBody JobPost jobPost) {
        service.addJob(jobPost);
        return jobPost;
    }

    @GetMapping("/jobPost")
    public JobPost createJob(@RequestBody JobPost jobPost) {
        service.addJob(jobPost);
        return jobPost;
    }

    // Update job
    @PutMapping("/jobPost/{postId}")
    public JobPost updateJob(@PathVariable int postId, @RequestBody JobPost jobPost) {
        service.updateJob(jobPost);
        return jobPost;
    }

    // Delete job
    @DeleteMapping("/jobPost/{postId}")
    public String deleteJob(@PathVariable int postId) {
        service.deleteJob(postId);
        return "Job deleted successfully!";
    }

    //loading data
//    @GetMapping("load")
//    public String loadData() {
//        service.load();
//        return "success";
//    }


    // Search jobs by keyword
    @GetMapping("/jobPosts/keyword/{keyword}")
    public List<JobPost> searchJobs(@PathVariable String keyword) {
        return service.search(keyword);
    }
}