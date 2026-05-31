package com.aditya.adventuregame.controller;


import com.aditya.adventuregame.dto.EquipResponse;
import com.aditya.adventuregame.dto.InventoryResponse;
import com.aditya.adventuregame.dto.UsePotionResponse;
import com.aditya.adventuregame.entity.InventoryItem;
import com.aditya.adventuregame.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InventoryController {
    private final InventoryService inventoryService;

    @GetMapping("/{characterId}")
    public List<InventoryResponse> getInventory(@PathVariable Long characterId){
        return inventoryService.getInventory(characterId);
    }

    @PostMapping("/use-potion/{characterId}")
    public UsePotionResponse usePotion(@PathVariable Long characterId){
        return inventoryService.usePotion(characterId);
    }

    @PostMapping("/equip/{characterId}/{itemId}")
    public EquipResponse equipItem(@PathVariable Long characterId, @PathVariable Long itemId){
        return inventoryService.equipItem(characterId,itemId);
    }
}
