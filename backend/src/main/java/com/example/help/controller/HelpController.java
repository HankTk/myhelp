package com.example.help.controller;

import com.example.help.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/help")
public class HelpController 
{
    private final HelpService helpService;

    @Autowired
    public HelpController(HelpService helpService) 
    {
        this.helpService = helpService;
    }

    @PostMapping("/upload/{language}")
    public ResponseEntity<String> uploadHelpFile(
            @PathVariable String language,
            @RequestParam("file") MultipartFile file) 
    {
        String fileName = helpService.storeHelpFile(file, language);
        return ResponseEntity.ok(fileName);
    }

    @GetMapping("/download/{language}/{fileName:.+}")
    public ResponseEntity<Resource> downloadHelpFile(
            @PathVariable String language,
            @PathVariable String fileName) 
    {
        Resource resource = helpService.loadHelpFileAsResource(language, fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping(value = "/content/{language}/{fileName:.+}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> getHelpContent(
            @PathVariable String language,
            @PathVariable String fileName) 
    {
        try {
            String content = helpService.getHelpContent(language, fileName);
            return ResponseEntity.ok(content);
        } catch (HelpException ex) {
            logger.error("Help content not found for language: {} and file: {}", language, fileName);
            return ResponseEntity.ok("<div class=\"help-content\">\n" +
                    "  <h2>Help Content Not Available</h2>\n" +
                    "  <p>Sorry, the help content for this page is not available at the moment.</p>\n" +
                    "</div>");
        }
    }

    @GetMapping("/languages")
    public ResponseEntity<List<String>> getAvailableLanguages() 
    {
        return ResponseEntity.ok(helpService.getAvailableLanguages());
    }

    @GetMapping("/download-language/{language}")
    public ResponseEntity<Resource> downloadLanguageHelp(@PathVariable String language) 
    {
        Resource resource = helpService.prepareLanguageHelpZip(language);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"help-" + language + ".zip\"")
                .body(resource);
    }

    @GetMapping("/index")
    public ResponseEntity<String> getIndexHtml(@RequestParam(defaultValue = "en") String language) 
    {
        try {
            Resource resource = helpService.loadHelpFileAsResource(language, "index.html");
            String content = new String(resource.getInputStream().readAllBytes());
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "text/html; charset=UTF-8")
                    .body(content);
        } catch (IOException ex) {
            logger.error("Failed to read index.html for language: {}", language, ex);
            throw new HelpException("Could not read index.html", ex);
        }
    }
} 