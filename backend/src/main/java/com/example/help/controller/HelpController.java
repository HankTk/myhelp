package com.example.help.controller;

import com.example.help.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/help")
public class HelpController {

    private final HelpService helpService;

    @Autowired
    public HelpController(HelpService helpService) {
        this.helpService = helpService;
    }

    @PostMapping("/upload/{language}")
    public ResponseEntity<String> uploadHelpFile(
            @PathVariable String language,
            @RequestParam("file") MultipartFile file) {
        String fileName = helpService.storeHelpFile(file, language);
        return ResponseEntity.ok(fileName);
    }

    @GetMapping("/download/{language}/{fileName:.+}")
    public ResponseEntity<Resource> downloadHelpFile(
            @PathVariable String language,
            @PathVariable String fileName) {
        Resource resource = helpService.loadHelpFileAsResource(language, fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/languages")
    public ResponseEntity<List<String>> getAvailableLanguages() {
        return ResponseEntity.ok(helpService.getAvailableLanguages());
    }

    @GetMapping("/download-language/{language}")
    public ResponseEntity<Resource> downloadLanguageHelp(@PathVariable String language) {
        Resource resource = helpService.prepareLanguageHelpZip(language);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"help-" + language + ".zip\"")
                .body(resource);
    }

    @GetMapping("/welcome")
    public ResponseEntity<String> getWelcomeContent(@RequestParam(defaultValue = "en") String language) {
        String content = helpService.getWelcomeContent(language);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/html; charset=UTF-8")
                .body(content);
    }
} 