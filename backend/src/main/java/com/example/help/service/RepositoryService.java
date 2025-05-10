package com.example.help.service;

import org.springframework.core.io.Resource;
import java.io.IOException;
import java.util.List;

public interface RepositoryService 
{
    List<String> listLanguageFiles() throws IOException;
    List<String> listFiles() throws IOException;
    Resource getFile(String fileName) throws IOException;
    void copyAndExtractFile(String fileName) throws IOException;
} 