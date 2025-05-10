package com.example.help.service;

import com.example.help.model.HelpContent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HelpService 
{
    private static final Logger logger = LoggerFactory.getLogger(HelpService.class);
    private final Path helpStorageLocation;

    public HelpService() 
    {
        // Get the current working directory (backend) and go up one level to find help-files
        Path currentPath = Paths.get("").toAbsolutePath();
        Path helpFilesPath = currentPath.getParent().resolve("help-files").normalize();
        this.helpStorageLocation = helpFilesPath;
        try 
        {
            Files.createDirectories(this.helpStorageLocation);
            Files.createDirectories(this.helpStorageLocation.resolve("download"));
            logger.info("Help storage location initialized at: {}", this.helpStorageLocation);
        } 
        catch (IOException ex) 
        {
            logger.error("Failed to create help storage directory", ex);
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeHelpFile(MultipartFile file, String language) 
    {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try 
        {
            if (fileName.contains("..")) 
            {
                logger.error("Invalid file path sequence detected: {}", fileName);
                throw new RuntimeException("Invalid file path sequence " + fileName);
            }

            // Store downloaded file in the download folder
            Path downloadDir = this.helpStorageLocation.resolve("download");
            Files.createDirectories(downloadDir);
            
            Path targetLocation = downloadDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("Successfully stored downloaded file {} in download directory", fileName);

            return fileName;
        } 
        catch (IOException ex) 
        {
            logger.error("Failed to store file {}", fileName, ex);
            throw new RuntimeException("Could not store file " + fileName, ex);
        }
    }

    public Resource loadHelpFileAsResource(String language, String fileName) 
    {
        try 
        {
            Path filePath = this.helpStorageLocation.resolve(language + "/" + fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) 
            {
                logger.info("Successfully loaded file {} for language {}", fileName, language);
                return resource;
            } 
            else 
            {
                logger.error("File not found: {} for language {}", fileName, language);
                throw new RuntimeException("File not found " + fileName);
            }
        } 
        catch (MalformedURLException ex) 
        {
            logger.error("Failed to load file {} for language {}", fileName, language, ex);
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    public List<String> getAvailableLanguages() 
    {
        try 
        {
            List<String> languages = Files.list(this.helpStorageLocation)
                    .filter(Files::isDirectory)
                    .filter(path -> !path.getFileName().toString().equals("download"))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
            logger.info("Found available languages: {}", languages);
            return languages;
        } 
        catch (IOException e) 
        {
            logger.error("Failed to list available languages", e);
            return new ArrayList<>();
        }
    }

    public Resource prepareLanguageHelpZip(String language) 
    {
        try 
        {
            Path languageDir = this.helpStorageLocation.resolve(language);
            if (!Files.exists(languageDir)) 
            {
                logger.error("Language directory not found: {}", language);
                throw new RuntimeException("Language directory not found: " + language);
            }

            // Store zip file in the download folder
            Path zipFile = this.helpStorageLocation.resolve("download/help-" + language + ".zip");
            try (var zipOutputStream = new java.util.zip.ZipOutputStream(Files.newOutputStream(zipFile))) 
            {
                Files.walk(languageDir)
                    .filter(path -> !Files.isDirectory(path))
                    .forEach(path -> 
                    {
                        try 
                        {
                            String entryName = languageDir.relativize(path).toString();
                            zipOutputStream.putNextEntry(new java.util.zip.ZipEntry(entryName));
                            Files.copy(path, zipOutputStream);
                            zipOutputStream.closeEntry();
                        } 
                        catch (IOException e) 
                        {
                            logger.error("Failed to add file {} to zip", path, e);
                            throw new RuntimeException("Error creating zip file", e);
                        }
                    });
            }
            logger.info("Successfully created zip file for language: {}", language);
            return new UrlResource(zipFile.toUri());
        } 
        catch (IOException ex) 
        {
            logger.error("Failed to prepare language help zip for {}", language, ex);
            throw new RuntimeException("Could not prepare language help zip", ex);
        }
    }

    public String getWelcomeContent(String language) 
    {
        try 
        {
            Path welcomeFile = this.helpStorageLocation.resolve(language + "/index.html");
            logger.info("Attempting to read welcome file from: {}", welcomeFile.toAbsolutePath());
            
            if (!Files.exists(welcomeFile)) 
            {
                logger.error("Welcome file not found for language: {} at path: {}", language, welcomeFile.toAbsolutePath());
                throw new RuntimeException("Welcome file not found for language: " + language);
            }
            
            String content = Files.readString(welcomeFile);
            logger.info("Successfully loaded welcome content for language: {} from file: {}", language, welcomeFile.toAbsolutePath());
            return content;
        } 
        catch (IOException ex) 
        {
            logger.error("Failed to read welcome content for language: {} from path: {}", language, this.helpStorageLocation.resolve(language + "/index.html").toAbsolutePath(), ex);
            throw new RuntimeException("Could not read welcome content", ex);
        }
    }
} 