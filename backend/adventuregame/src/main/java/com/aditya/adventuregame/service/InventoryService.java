package com.aditya.adventuregame.service;

import com.aditya.adventuregame.dto.InventoryResponse;
import com.aditya.adventuregame.entity.InventoryItem;
import com.aditya.adventuregame.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public List<InventoryResponse> getInventory(Long characterId){
        List<InventoryItem> items=inventoryRepository.findByGameCharacterId(characterId);

        return items.stream()
                .map(
                        item->new InventoryResponse(
                                item.getItem().getName(),
                                item.getItem().getItemType().name(),
                                item.getQuantity()
                        )
                ).toList();
    }
}
