package com.teju.JobAppBackend.repo;

import com.teju.JobAppBackend.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobPost,Integer> {


    List<JobPost> findByPostProfileContainingOrPostDescContaining(String postProfile, String postDesc);



//    List<JobPost> jobs = new ArrayList<>(Arrays.asList(
//            new JobPost(1, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
//                    List.of("Core Java", "J2EE", "Spring Boot", "Hibernate")),
//            new JobPost(2, "Frontend Developer", "Experience in building responsive web applications using React", 3,
//                    List.of("HTML", "CSS", "JavaScript", "React")),
//            new JobPost(3, "Data Scientist", "Strong background in machine learning and data analysis", 4,
//                    List.of("Python", "Machine Learning", "Data Analysis")),
//            new JobPost(4, "Network Engineer", "Design and implement computer networks for efficient data communication", 5,
//                    List.of("Networking", "Cisco", "Routing", "Switching")),
//            new JobPost(5, "Mobile App Developer", "Experience in mobile app development for iOS and Android", 3,
//                    List.of("iOS Development", "Android Development", "Mobile App"))
//    ));
//
//    public List<JobPost> getAllJobs() {
//        return jobs;
//    }
//
//    public void addJob(JobPost job) {
//        jobs.add(job);
//    }
//
//    // Get job by ID
//    public JobPost getJobById(int postId) {
//        return jobs.stream()
//                .filter(job -> job.getPostId() == postId)
//                .findFirst()
//                .orElse(null);
//    }
//
//    // Update job
//    public void updateJob(JobPost jobPost) {
//        for (int i = 0; i < jobs.size(); i++) {
//            if (jobs.get(i).getPostId() == jobPost.getPostId()) {
//                jobs.set(i, jobPost);
//                break;
//            }
//        }
//    }
//
//    // Delete job
//    public void deleteJob(int postId) {
//        jobs.removeIf(job -> job.getPostId() == postId);
//    }
//
//    // Search jobs
//    public List<JobPost> searchJobs(String keyword) {
//        String lowerKeyword = keyword.toLowerCase();
//        return jobs.stream()
//                .filter(job ->
//                        job.getPostProfile().toLowerCase().contains(lowerKeyword) ||
//                                job.getPostDesc().toLowerCase().contains(lowerKeyword) ||
//                                job.getPostTechStack().stream()
//                                        .anyMatch(tech -> tech.toLowerCase().contains(lowerKeyword))
//                )
//                .collect(Collectors.toList());
//    }
}