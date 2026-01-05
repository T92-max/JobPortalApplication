package com.teju.JobAppBackend.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PerformanceAspect {
    private static final Logger LOGGER= LoggerFactory.getLogger(PerformanceAspect.class);
    @Around("execution(* com.teju.JobAppBackend.service.JobService.getAllJobs(..))")
    public Object monitorTime(ProceedingJoinPoint jp) throws Throwable {
        long start=System.currentTimeMillis();

       Object obj= jp.proceed();
        long end=System.currentTimeMillis();

        LOGGER.info("time taken {}", end - start + "ms");

        return obj;
    }
}
