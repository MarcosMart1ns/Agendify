package com.agendify.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST,reason = "Usuário já existe, escolha outro e-mail")
public class UserAlreadyExistsException extends Exception{

    private static final String message = "Usuario não encontrado";

    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException() {

    }

    @Override
    public String getMessage() {
        return message;
    }
}
