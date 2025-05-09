package com.example.help.service;

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
    private final Path repositoryLocation;
    private final Path downloadLocation;
    private final Path helpFilesLocation;

    public LocalRepositoryService() {
        // Get the current working directory (backend) and go up one level
        Path currentPath = Paths.get("").toAbsolutePath();
        Path parentPath = currentPath.getParent();
        
        // Set up paths
        this.repositoryLocation = parentPath.resolve("repositry").normalize();
        this.helpFilesLocation = parentPath.resolve("help-files").normalize();
        this.downloadLocation = this.helpFilesLocation.resolve("download").normalize();
        
        // Create necessary directories
        try {
            Files.createDirectories(this.downloadLocation);
            Files.createDirectories(this.helpFilesLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create directories", ex);
        }
    }

    @Override
    public List<String> listLanguageFiles() throws IOException {
        return Files.list(this.repositoryLocation)
                .filter(Files::isRegularFile)
                .filter(path -> path.getFileName().toString().startsWith("help-") && 
                              path.getFileName().toString().endsWith(".zip"))
                .map(path -> {
                    String fileName = path.getFileName().toString();
                    // Extract language code from help-{language}.zip
                    return fileName.substring(5, fileName.length() - 4);
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<String> listFiles() throws IOException {
        return Files.list(this.repositoryLocation)
                .filter(Files::isRegularFile)
                .map(Path::getFileName)
                .map(Path::toString)
                .collect(Collectors.toList());
    }

    @Override
    public Resource getFile(String fileName) throws IOException {
        Path filePath = this.repositoryLocation.resolve(fileName);
        if (!Files.exists(filePath)) {
            return null;
        }
        return new UrlResource(filePath.toUri());
    }

    @Override
    public void copyAndExtractFile(String fileName) throws IOException {
        // First, get the file from repository
        Path sourcePath = this.repositoryLocation.resolve(fileName);
        if (!Files.exists(sourcePath)) {
            throw new IOException("Source file not found in repository: " + fileName);
        }

        // Create a temporary copy in download directory
        Path tempPath = this.downloadLocation.resolve(fileName);
        Files.copy(sourcePath, tempPath, StandardCopyOption.REPLACE_EXISTING);

        // If it's a help-{language}.zip file, extract it
        if (fileName.startsWith("help-") && fileName.endsWith(".zip")) {
            String language = fileName.substring(5, fileName.length() - 4);
            extractZipFile(tempPath, language);
        }
    }

    private void extractZipFile(Path zipFile, String language) throws IOException {
        Path languageDir = this.helpFilesLocation.resolve(language);
        Files.createDirectories(languageDir);

        try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(zipFile))) {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) {
                Path entryPath = languageDir.resolve(entry.getName());
                if (entry.isDirectory()) {
                    Files.createDirectories(entryPath);
                } else {
                    Files.createDirectories(entryPath.getParent());
                    Files.copy(zipInputStream, entryPath, StandardCopyOption.REPLACE_EXISTING);
                }
                zipInputStream.closeEntry();
            }
        }
    }
} 