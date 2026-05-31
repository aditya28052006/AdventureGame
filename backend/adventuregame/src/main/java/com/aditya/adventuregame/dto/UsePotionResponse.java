package com.aditya.adventuregame.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsePotionResponse {
    private int health;
    private int remainingPotions;
    private String message;
}
