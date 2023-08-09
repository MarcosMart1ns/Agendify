package com.agendify.webapp.security.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_GATEWAY)
public class RequestTokenException extends Exception{

    public RequestTokenException(String message) {
        super(message);
    }

    public RequestTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public RequestTokenException(Throwable cause) {
        super(cause);
    }
}
