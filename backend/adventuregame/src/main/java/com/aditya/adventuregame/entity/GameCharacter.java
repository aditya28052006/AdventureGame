package com.aditya.adventuregame.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="characters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String characterClass;
    private int level;
    private int health;
    private int attack;
    private int defense;

    @Column(nullable = false)
    private int xp;

    @ManyToOne
    @JoinColumn(name = "equipped_weapon_id")
    private Item equippedWeapon;

    @ManyToOne
    @JoinColumn(name = "equipped_armor_id")
    private Item equippedArmor;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
