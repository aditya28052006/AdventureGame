package com.aditya.adventuregame.service;

import com.aditya.adventuregame.dto.CharacterRequest;
import com.aditya.adventuregame.dto.CharacterResponse;
import com.aditya.adventuregame.entity.GameCharacter;
import com.aditya.adventuregame.entity.User;
import com.aditya.adventuregame.repository.CharacterRepository;
import com.aditya.adventuregame.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    public CharacterResponse createCharacter(CharacterRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        int health = 0;
        int attack = 0;
        int defense = 0;

        switch (request.getCharacterClass()) {
            case "Warrior":
                health = 150;
                attack = 20;
                defense = 15;
                break;

            case "Mage":
                health = 100;
                attack = 30;
                defense = 8;
                break;

            case "Rogue":
                health = 120;
                attack = 25;
                defense = 10;
                break;

            default:
                throw new RuntimeException("Invalid class");
        }

        GameCharacter character = GameCharacter.builder()
                .name(request.getName())
                .characterClass(request.getCharacterClass())
                .level(1)
                .xp(0)
                .health(health)
                .attack(attack)
                .defense(defense)
                .user(user)
                .build();

        characterRepository.save(character);

        return new CharacterResponse(
                character.getName(),
                character.getCharacterClass(),
                character.getLevel(),
                character.getHealth(),
                character.getAttack(),
                character.getDefense()
        );
    }
}