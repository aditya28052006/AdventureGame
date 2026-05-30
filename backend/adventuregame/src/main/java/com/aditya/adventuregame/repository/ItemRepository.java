package com.aditya.adventuregame.repository;

import com.aditya.adventuregame.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item,Long> {

}
