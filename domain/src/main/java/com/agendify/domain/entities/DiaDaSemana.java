package com.agendify.domain.entities;

import java.io.Serializable;
import java.time.DayOfWeek;


public enum DiaDaSemana implements Serializable {
    SEGUNDA,
    TERCA,
    QUARTA,
    QUINTA,
    SEXTA,
    SABADO,
    DOMINGO;

    public static DiaDaSemana fromDayOfWeek(DayOfWeek dayOfWeek) {
        return DiaDaSemana.values()[dayOfWeek.ordinal()];
    }
}
