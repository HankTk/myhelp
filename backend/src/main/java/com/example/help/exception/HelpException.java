package com.example.help.exception;

public class HelpException extends RuntimeException {
    public HelpException(String message) {
        super(message);
    }

    public HelpException(String message, Throwable cause) {
        super(message, cause);
    }
} 