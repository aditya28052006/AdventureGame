package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.GameCharacter;
import com.aditya.adventuregame.entity.InventoryItem;
import com.aditya.adventuregame.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventoryRepository extends JpaRepository<InventoryItem,Long> {

    Optional<InventoryItem> findByGameCharacterAndItem(GameCharacter gameCharacter, Item item);
}
