package com.agendify.webapp.security.exceptions;

public class InvalidTokenException extends Exception{

    public InvalidTokenException(String message) {
        super(message);
    }

    public InvalidTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidTokenException(Throwable cause) {
        super(cause);
    }
}
