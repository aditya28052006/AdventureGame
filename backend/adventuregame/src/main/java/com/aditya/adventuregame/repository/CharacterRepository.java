package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.GameCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<GameCharacter,Long> {
    List<Character> findUserById(Long userId);
}
