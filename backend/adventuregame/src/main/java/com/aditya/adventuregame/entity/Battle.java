package com.aditya.adventuregame.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="battles")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Battle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int playerHealth;
    private int monsterHealth;
    private boolean finished;

    @ManyToOne
    private GameCharacter gameCharacter;

    @ManyToOne
    private Monster monster;
}
