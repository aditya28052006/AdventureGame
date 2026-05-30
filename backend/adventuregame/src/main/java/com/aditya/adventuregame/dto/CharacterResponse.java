package com.aditya.adventuregame.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CharacterResponse {
    private String name;
    private String characterClass;
    private int level;
    private int xp;
    private int health;
    private int attack;
    private int defense;
}
