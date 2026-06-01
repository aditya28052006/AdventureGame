package com.aditya.adventuregame.service;

import com.aditya.adventuregame.dto.EquipResponse;
import com.aditya.adventuregame.dto.InventoryResponse;
import com.aditya.adventuregame.dto.UsePotionResponse;
import com.aditya.adventuregame.entity.GameCharacter;
import com.aditya.adventuregame.entity.InventoryItem;
import com.aditya.adventuregame.entity.Item;
import com.aditya.adventuregame.entity.ItemType;
import com.aditya.adventuregame.repository.CharacterRepository;
import com.aditya.adventuregame.repository.InventoryRepository;
import com.aditya.adventuregame.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final CharacterRepository characterRepository;
    private final ItemRepository itemRepository;

    public List<InventoryResponse> getInventory(Long characterId){
        List<InventoryItem> items=inventoryRepository.findByGameCharacterId(characterId);

        return items.stream()
                .map(
                        item->new InventoryResponse(
                                item.getItem().getId(),
                                item.getItem().getName(),
                                item.getItem().getItemType().name(),
                                item.getQuantity()
                        )
                ).toList();
    }

    public UsePotionResponse usePotion(Long characterId){
        GameCharacter character=characterRepository.findById(characterId)
                .orElseThrow(()->new RuntimeException("Character not found"));

        Item potion=itemRepository.findByName("Health Potion")
                .orElseThrow(()-> new RuntimeException("Potion Not Found!!"));

        InventoryItem inventoryItem=inventoryRepository.findByGameCharacterAndItem(
                character,
                potion
        ).orElseThrow(()->new RuntimeException("No potions available"));

        if(inventoryItem.getQuantity()<=0){
            throw new RuntimeException("No potions available");
        }

        character.setHealth(character.getHealth()+potion.getValue());

        inventoryItem.setQuantity(inventoryItem.getQuantity()-1);

        characterRepository.save(character);
        inventoryRepository.save(inventoryItem);

        return new UsePotionResponse(
                character.getHealth(),
                inventoryItem.getQuantity(),
                "Potion used!!"
        );
    }

    public EquipResponse equipItem(Long characterId,Long itemId){
        GameCharacter character=characterRepository.findById(characterId)
                .orElseThrow(()->new RuntimeException("Character not found"));

        Item item=itemRepository.findById(itemId)
                .orElseThrow(()-> new RuntimeException("Item Not Found!!"));

        if(item.getItemType()== ItemType.WEAPON){
            character.setEquippedWeapon(item);
            character.setAttack(
                    character.getAttack()+item.getValue()
            );
        }
        else if(item.getItemType()==ItemType.ARMOR){
            character.setEquippedArmor(item);
            character.setDefense(
                    character.getDefense()+item.getValue()
            );
        }
        else{
            throw new RuntimeException("Potions can not be equipped!!");
        }
        characterRepository.save(character);

        return new EquipResponse(
                item.getName()+" equipped!",
                character.getAttack(),
                character.getDefense()
        );
    }
}
