package com.aditya.adventuregame.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StartBattleResponse {
    private Long battleId;
    private int playerHealth;
    private int monsterHealth;
    private String message;
}
