package com.example.help.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@RestController
@RequestMapping("/api/help")
public class HelpUploadController 
{
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException 
    {
        String lang = file.getOriginalFilename().contains("ja") ? "ja" : "en";
        // Get the backend directory path and go up one level to find help-files
        Path backendPath = Paths.get("").toAbsolutePath();
        Path helpFilesPath = backendPath.getParent().resolve("help-files").normalize();
        Path downloadDir = helpFilesPath.resolve("download");
        Path languageDir = helpFilesPath.resolve(lang);
        
        // Create necessary directories
        Files.createDirectories(downloadDir);
        Files.createDirectories(languageDir);

        // Store the uploaded file in download directory
        Path targetFile = downloadDir.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING);

        // Extract the zip file to the language directory
        try (ZipInputStream zipInputStream = new ZipInputStream(Files.newInputStream(targetFile))) 
        {
            ZipEntry entry;
            while ((entry = zipInputStream.getNextEntry()) != null) 
            {
                Path entryPath = languageDir.resolve(entry.getName());
                if (entry.isDirectory()) 
                {
                    Files.createDirectories(entryPath);
                } 
                else 
                {
                    Files.createDirectories(entryPath.getParent());
                    Files.copy(zipInputStream, entryPath, StandardCopyOption.REPLACE_EXISTING);
                }
                zipInputStream.closeEntry();
            }
        }

        return ResponseEntity.ok("Uploaded and extracted to help-files/" + lang + "/" + file.getOriginalFilename());
    }
}
