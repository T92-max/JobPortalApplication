package com.teju.JobAppBackend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import com.teju.JobAppBackend.model.JobPost;
import java.util.List;
import java.util.Map;

@Service
public class JobAIService {

    private final ChatClient chatClient;

    public JobAIService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    // Generate job description using AI
    public String generateJobDescription(String jobTitle, String skills) {
        String promptText = """
            Write a brief job description for: {jobTitle}
            Skills needed: {skills}
            Keep it under 100 words.
            """;

        try {
            System.out.println("Generating description for: " + jobTitle);

            PromptTemplate promptTemplate = new PromptTemplate(promptText);
            Prompt prompt = promptTemplate.create(Map.of(
                    "jobTitle", jobTitle,
                    "skills", skills
            ));

            String response = chatClient.prompt(prompt).call().content();
            System.out.println("Generated description: " + response);
            return response;
        } catch (Exception e) {
            System.err.println("Error generating description: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to generate description: " + e.getMessage());
        }
    }

    // Match candidate skills to job
    public String matchCandidateToJob(String candidateSkills, JobPost job) {
        String promptText = """
            Analyze this match:
            Job: {jobTitle}
            Required: {techStack}
            Candidate has: {candidateSkills}
            
            Give: match %, matching skills, missing skills. Keep brief.
            """;

        try {
            System.out.println("Matching candidate to job: " + job.getPostProfile());

            PromptTemplate promptTemplate = new PromptTemplate(promptText);
            Prompt prompt = promptTemplate.create(Map.of(
                    "jobTitle", job.getPostProfile(),
                    "techStack", String.join(", ", job.getPostTechStack()),
                    "candidateSkills", candidateSkills
            ));

            String response = chatClient.prompt(prompt).call().content();
            System.out.println("Match analysis complete");
            return response;
        } catch (Exception e) {
            System.err.println("Error matching candidate: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to match candidate: " + e.getMessage());
        }
    }

    // Get personalized job recommendations
    public String getJobRecommendations(String userProfile, List<JobPost> allJobs) {
        if (allJobs.isEmpty()) {
            return "No jobs available.";
        }

        // Limit to first 5 jobs to avoid token limits
        StringBuilder jobsList = new StringBuilder();
        int count = Math.min(5, allJobs.size());

        for (int i = 0; i < count; i++) {
            JobPost job = allJobs.get(i);
            jobsList.append(String.format(
                    "%d. %s (%s)\n",
                    i + 1,
                    job.getPostProfile(),
                    String.join(", ", job.getPostTechStack())
            ));
        }

        String promptText = """
            User profile: {userProfile}
            
            Jobs:
            {jobsList}
            
            Recommend top 2 jobs. Keep brief.
            """;

        try {
            System.out.println("Getting recommendations for profile");

            PromptTemplate promptTemplate = new PromptTemplate(promptText);
            Prompt prompt = promptTemplate.create(Map.of(
                    "userProfile", userProfile,
                    "jobsList", jobsList.toString()
            ));

            String response = chatClient.prompt(prompt).call().content();
            System.out.println("Recommendations generated");
            return response;
        } catch (Exception e) {
            System.err.println("Error getting recommendations: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to get recommendations: " + e.getMessage());
        }
    }

    // Improve job posting with AI suggestions
    public String improveJobPosting(JobPost job) {
        String promptText = """
            Review and suggest improvements for this job posting:
            
            Title: {title}
            Description: {description}
            Skills: {skills}
            Experience Required: {experience} years
            
            Provide 3-5 specific suggestions to make it more attractive to qualified candidates.
            Keep suggestions actionable and brief.
            """;

        PromptTemplate promptTemplate = new PromptTemplate(promptText);
        Prompt prompt = promptTemplate.create(Map.of(
                "title", job.getPostProfile(),
                "description", job.getPostDesc(),
                "skills", String.join(", ", job.getPostTechStack()),
                "experience", String.valueOf(job.getReqExperience())
        ));

        return chatClient.prompt(prompt).call().content();
    }

    // Simple chat/question answering about a job
    public String askAboutJob(JobPost job, String question) {
        String promptText = """
            Job Details:
            Title: {title}
            Description: {description}
            Skills: {skills}
            Experience: {experience} years
            
            Question: {question}
            
            Answer the question based on the job details above.
            """;

        PromptTemplate promptTemplate = new PromptTemplate(promptText);
        Prompt prompt = promptTemplate.create(Map.of(
                "title", job.getPostProfile(),
                "description", job.getPostDesc(),
                "skills", String.join(", ", job.getPostTechStack()),
                "experience", String.valueOf(job.getReqExperience()),
                "question", question
        ));

        return chatClient.prompt(prompt).call().content();
    }
}