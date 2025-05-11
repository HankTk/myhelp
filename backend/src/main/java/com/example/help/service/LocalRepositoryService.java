package com.example.help.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class LocalRepositoryService implements RepositoryService {
    private static final Logger logger = LoggerFactory.getLogger(LocalRepositoryService.class);
    private final Path repositoryLocation;
    private final Path downloadLocation;
    private final Path helpFilesLocation;

    public LocalRepositoryService() {
        // Get the current working directory (backend) and go up one level
        Path currentPath = Paths.get("").toAbsolutePath();
        Path parentPath = currentPath.getParent();

        // Set up paths
        this.repositoryLocation = parentPath.resolve("repository").normalize();
        this.helpFilesLocation = parentPath.resolve("help-files").normalize();
        this.downloadLocation = this.helpFilesLocation.resolve("download").normalize();

        logger.info("Repository location: {}", this.repositoryLocation);
        logger.info("Help files location: {}", this.helpFilesLocation);
        logger.info("Download location: {}", this.downloadLocation);

        // Create necessary directories
        try {
            Files.createDirectories(this.downloadLocation);
            Files.createDirectories(this.helpFilesLocation);
            logger.info("Directories created successfully");
        } catch (IOException ex) {
            logger.error("Failed to create directories", ex);
            throw new RuntimeException("Could not create directories", ex);
        }
    }

    @Override
    public List<String> listLanguageFiles() throws IOException {
        logger.info("Listing language files from: {}", this.repositoryLocation);
        List<String> files = Files.list(this.repositoryLocation)
                .filter(Files::isRegularFile)
                .filter(path -> path.getFileName().toString().startsWith("help-") &&
                              path.getFileName().toString().endsWith(".zip"))
                .map(path -> {
                    String fileName = path.getFileName().toString();
                    // Extract language code from help-{language}.zip
                    return fileName.substring(5, fileName.length() - 4);
                })
                .collect(Collectors.toList());
        logger.info("Found language files: {}", files);
        return files;
    }

    @Override
    public List<String> listFiles() throws IOException {
        logger.info("Listing all files from: {}", this.repositoryLocation);
        List<String> files = Files.list(this.repositoryLocation)
                .filter(Files::isRegularFile)
                .map(Path::getFileName)
                .map(Path::toString)
                .collect(Collectors.toList());
        logger.info("Found files: {}", files);
        return files;
    }

    @Override
    public Resource getFile(String fileName) throws IOException {
        // First, get the file from repository
        Path sourcePath = this.repositoryLocation.resolve(fileName);
        logger.info("Attempting to get file: {}", sourcePath);

        if (!Files.exists(sourcePath)) {
            logger.error("Source file not found: {}", sourcePath);
            return null;
        }

        // Create a copy in download directory
        Path downloadPath = this.downloadLocation.resolve(fileName);
        logger.info("Copying file to download directory: {}", downloadPath);
        Files.copy(sourcePath, downloadPath, StandardCopyOption.REPLACE_EXISTING);

        logger.info("File found and copied, creating resource for: {}", downloadPath);
        return new UrlResource(downloadPath.toUri());
    }

    @Override
    public void copyAndExtractFile(String fileName) throws IOException {
        // First, get the file from repository
        Path sourcePath = this.repositoryLocation.resolve(fileName);
        logger.info("Attempting to copy file from: {}", sourcePath);

        if (!Files.exists(sourcePath)) {
            logger.error("Source file not found: {}", sourcePath);
            throw new IOException("Source file not found in repository: " + fileName);
        }

        // Create a temporary copy in download directory
        Path tempPath = this.downloadLocation.resolve(fileName);
        logger.info("Copying file to: {}", tempPath);
        Files.copy(sourcePath, tempPath, StandardCopyOption.REPLACE_EXISTING);

        // If it's a help-{language}.zip file, extract it
        if (fileName.startsWith("help-") && fileName.endsWith(".zip")) {
            String language = fileName.substring(5, fileName.length() - 4);
            logger.info("Extracting zip file for language: {}", language);
            extractZipFile(tempPath, language);
        }
    }

    private void extractZipFile(Path zipFile, String language) throws IOException {
        Path languageDir = this.helpFilesLocation.resolve(language);
        logger.info("Extracting to directory: {}", languageDir);
        Files.createDirectories(languageDir);

        try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(zipFile))) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                Path entryPath = languageDir.resolve(entry.getName());
                logger.info("Processing zip entry: {} -> {}", entry.getName(), entryPath);
                
                if (entry.isDirectory()) {
                    logger.info("Creating directory: {}", entryPath);
                    Files.createDirectories(entryPath);
                } else {
                    logger.info("Extracting file: {} to {}", entry.getName(), entryPath);
                    Files.createDirectories(entryPath.getParent());
                    Files.copy(zipInputStream, entryPath, StandardCopyOption.REPLACE_EXISTING);
                    logger.info("Successfully extracted file: {}", entryPath);
                }
                zipInputStream.closeEntry();
            }
            logger.info("Finished extracting zip file for language: {}", language);
        } catch (IOException ex) {
            logger.error("Error extracting zip file: {}", zipFile, ex);
            throw ex;
        }
    }
}
