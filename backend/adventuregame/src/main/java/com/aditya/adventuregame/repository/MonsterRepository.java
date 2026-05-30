package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.Monster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonsterRepository extends JpaRepository<Monster,Long> {

    Optional<Monster> findByName(String name);

}
