package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.GameCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CharacterRepository extends JpaRepository<GameCharacter,Long> {
    List<GameCharacter> findByUserId(Long userId);
    Optional<GameCharacter> findByName(String name);
}
