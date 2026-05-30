package com.aditya.adventuregame.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "monsters")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Monster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int health;

    private int attack;

    private int xpReward;

}
