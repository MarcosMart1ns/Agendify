package com.agendify.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Quantidade de caracteres insuficientes para pesquisa, insira ao mínimo 5 caracteres")
public class InsufficientSearchArguments extends Throwable {
}
