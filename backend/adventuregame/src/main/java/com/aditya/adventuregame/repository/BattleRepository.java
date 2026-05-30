package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.Battle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BattleRepository extends JpaRepository<Battle,Long> {
}
