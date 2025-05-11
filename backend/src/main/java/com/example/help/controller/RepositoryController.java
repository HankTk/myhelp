package com.example.help.controller;

import com.example.help.service.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/repository")
public class RepositoryController 
{
    private final RepositoryService repositoryService;

    @Autowired
    public RepositoryController(RepositoryService repositoryService) 
    {
        this.repositoryService = repositoryService;
    }

    @GetMapping("/languages")
    public ResponseEntity<List<String>> listLanguageFiles() 
    {
        try 
        {
            List<String> languages = repositoryService.listLanguageFiles();
            return ResponseEntity.ok(languages);
        } 
        catch (IOException ex) 
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/download-language/{language}")
    public ResponseEntity<Resource> downloadLanguageFile(@PathVariable String language) 
    {
        try 
        {
            String fileName = "help-" + language + ".zip";
            
            // First copy and extract the file
            repositoryService.copyAndExtractFile(fileName);
            
            // Then get the file for download
            Resource resource = repositoryService.getFile(fileName);
            if (resource != null && resource.exists()) 
            {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                        .body(resource);
            } 
            else 
            {
                return ResponseEntity.notFound().build();
            }
        } 
        catch (IOException ex) 
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<String>> listFiles() 
    {
        try 
        {
            List<String> files = repositoryService.listFiles();
            return ResponseEntity.ok(files);
        } 
        catch (IOException ex) 
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) 
    {
        try 
        {
            // Copy and extract the file if it's a help zip
            repositoryService.copyAndExtractFile(fileName);
            
            // Get the file for download
            Resource resource = repositoryService.getFile(fileName);
            if (resource != null && resource.exists()) 
            {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                        .body(resource);
            } 
            else 
            {
                return ResponseEntity.notFound().build();
            }
        } 
        catch (IOException ex) 
        {
            return ResponseEntity.internalServerError().build();
        }
    }
} 