package com.aditya.adventuregame.controller;


import com.aditya.adventuregame.dto.CharacterRequest;
import com.aditya.adventuregame.dto.CharacterResponse;
import com.aditya.adventuregame.entity.GameCharacter;
import com.aditya.adventuregame.security.JwtService;
import com.aditya.adventuregame.service.CharacterService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/characters")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CharacterController {
    private final CharacterService characterService;
    private final JwtService jwtService;

    @PostMapping("/create")
    public CharacterResponse createCharacter(@RequestBody CharacterRequest request){
        return characterService.createCharacter(request);
    }

    @GetMapping("/{name}")
    public CharacterResponse getCharacter(@PathVariable String name){
        return characterService.getCharacter(name);
    }



    @GetMapping("/me")
    public CharacterResponse getMyCharacter(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return characterService.getMyCharacter(email);
    }
}
