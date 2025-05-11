package com.example.help;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelpApplication {
    private static final Logger logger = LoggerFactory.getLogger(HelpApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(HelpApplication.class, args);
        logger.info("Application started successfully");
    }
}
