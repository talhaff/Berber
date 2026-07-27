package com.berber.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    public static ResourceNotFoundException of(String resource, Long id) {
        return new ResourceNotFoundException(resource + " bulunamadı: " + id);
    }
}
