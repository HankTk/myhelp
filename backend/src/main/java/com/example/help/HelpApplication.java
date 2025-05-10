package com.example.help;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class HelpApplication 
{
    private static final Logger logger = LoggerFactory.getLogger(HelpApplication.class);

    public static void main(String[] args) 
    {
        SpringApplication.run(HelpApplication.class, args);
        logger.info("Application started successfully");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() 
    {
        return new WebMvcConfigurer() 
        {
            @Override
            public void addCorsMappings(CorsRegistry registry) 
            {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}
