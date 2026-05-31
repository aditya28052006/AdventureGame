package com.aditya.adventuregame.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InventoryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "character_id")
    private GameCharacter gameCharacter;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
}
