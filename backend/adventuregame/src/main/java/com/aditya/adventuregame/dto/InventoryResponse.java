package com.aditya.adventuregame.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InventoryResponse {
    private Long itemId;
    private String itemName;
    private String itemType;
    private int quantity;
}
