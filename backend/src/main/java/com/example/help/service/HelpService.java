package com.example.help.service;

import com.example.help.exception.HelpException;
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
public class HelpService {
    private static final Logger logger = LoggerFactory.getLogger(HelpService.class);
    private final Path helpStorageLocation;

    public HelpService() {
        Path currentPath = Paths.get("").toAbsolutePath();
        Path helpFilesPath = currentPath.getParent().resolve("help-files").normalize();
        this.helpStorageLocation = helpFilesPath;
        initializeStorage();
    }

    private void initializeStorage() {
        try {
            Files.createDirectories(this.helpStorageLocation);
            Files.createDirectories(this.helpStorageLocation.resolve("download"));
            logger.info("Help storage location initialized at: {}", this.helpStorageLocation);
        } catch (IOException ex) {
            logger.error("Failed to create help storage directory", ex);
            throw new HelpException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeHelpFile(MultipartFile file, String language) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            validateFileName(fileName);
            Path downloadDir = this.helpStorageLocation.resolve("download");
            Files.createDirectories(downloadDir);
            
            Path targetLocation = downloadDir.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("Successfully stored downloaded file {} in download directory", fileName);

            return fileName;
        } catch (IOException ex) {
            logger.error("Failed to store file {}", fileName, ex);
            throw new HelpException("Could not store file " + fileName, ex);
        }
    }

    private void validateFileName(String fileName) {
        if (fileName.contains("..")) {
            logger.error("Invalid file path sequence detected: {}", fileName);
            throw new HelpException("Invalid file path sequence " + fileName);
        }
    }

    public Resource loadHelpFileAsResource(String language, String fileName) {
        try {
            Path filePath = this.helpStorageLocation.resolve(language + "/" + fileName);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                logger.info("Successfully loaded file {} for language {}", fileName, language);
                return resource;
            } else {
                logger.error("File not found: {} for language {}", fileName, language);
                if (!language.equals("en")) {
                    Path defaultPath = this.helpStorageLocation.resolve("en/" + fileName);
                    Resource defaultResource = new UrlResource(defaultPath.toUri());
                    if (defaultResource.exists()) {
                        logger.info("Loading default language (en) file {} instead", fileName);
                        return defaultResource;
                    }
                }
                throw new HelpException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            logger.error("Failed to load file {} for language {}", fileName, language, ex);
            throw new HelpException("File not found " + fileName, ex);
        }
    }

    public List<String> getAvailableLanguages() {
        try {
            List<String> languages = Files.list(this.helpStorageLocation)
                    .filter(Files::isDirectory)
                    .filter(path -> !path.getFileName().toString().equals("download"))
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .collect(Collectors.toList());
            logger.info("Found available languages: {}", languages);
            return languages;
        } catch (IOException e) {
            logger.error("Failed to list available languages", e);
            return new ArrayList<>();
        }
    }

    public Resource prepareLanguageHelpZip(String language) {
        try {
            Path languageDir = this.helpStorageLocation.resolve(language);
            if (!Files.exists(languageDir)) {
                logger.error("Language directory not found: {}", language);
                throw new HelpException("Language directory not found: " + language);
            }

            Path zipFile = this.helpStorageLocation.resolve("download/help-" + language + ".zip");
            createZipFile(languageDir, zipFile);
            
            logger.info("Successfully created zip file for language: {}", language);
            return new UrlResource(zipFile.toUri());
        } catch (IOException ex) {
            logger.error("Failed to prepare language help zip for {}", language, ex);
            throw new HelpException("Could not prepare language help zip", ex);
        }
    }

    private void createZipFile(Path sourceDir, Path zipFile) throws IOException {
        try (var zipOutputStream = new java.util.zip.ZipOutputStream(Files.newOutputStream(zipFile))) {
            Files.walk(sourceDir)
                .filter(path -> !Files.isDirectory(path))
                .forEach(path -> {
                    try {
                        String entryName = sourceDir.relativize(path).toString();
                        zipOutputStream.putNextEntry(new java.util.zip.ZipEntry(entryName));
                        Files.copy(path, zipOutputStream);
                        zipOutputStream.closeEntry();
                    } catch (IOException e) {
                        logger.error("Failed to add file {} to zip", path, e);
                        throw new HelpException("Error creating zip file", e);
                    }
                });
        }
    }

    public String getHelpContent(String language, String fileName) {
        try {
            Path helpFile = this.helpStorageLocation.resolve(language + "/" + fileName);
            logger.info("Attempting to read help file from: {}", helpFile.toAbsolutePath());
            
            if (!Files.exists(helpFile)) {
                logger.error("Help file not found for language: {} at path: {}", language, helpFile.toAbsolutePath());
                throw new HelpException("Help file not found for language: " + language);
            }
            
            String content = Files.readString(helpFile);
            logger.info("Successfully loaded help content for language: {}", language);
            return content;
        } catch (IOException ex) {
            logger.error("Failed to read help content for language: {}", language, ex);
            throw new HelpException("Could not read help content", ex);
        }
    }
} 