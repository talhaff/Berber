package com.berber.exception;

public class SlotConflictException extends RuntimeException {
    public SlotConflictException(String time) {
        super("Bu saat diliminde zaten bir randevu mevcut: " + time);
    }
}
