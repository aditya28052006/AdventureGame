package com.aditya.adventuregame.controller;


import com.aditya.adventuregame.dto.CharacterRequest;
import com.aditya.adventuregame.dto.CharacterResponse;
import com.aditya.adventuregame.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CharacterController {
    private final CharacterService characterService;

    @PostMapping("/create")
    public CharacterResponse createCharacter(@RequestBody CharacterRequest request){
        return characterService.createCharacter(request);
    }

    @GetMapping("/{name}")
    public CharacterResponse getCharacter(@PathVariable String name){
        return characterService.getCharacter(name);
    }
}
