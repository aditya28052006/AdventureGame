package com.aditya.adventuregame.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character,Long> {
    List<Character> findUserById(Long userId);
}
