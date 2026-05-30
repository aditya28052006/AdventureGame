package com.aditya.adventuregame.controller;


import com.aditya.adventuregame.dto.BattleRequest;
import com.aditya.adventuregame.dto.BattleResponse;
import com.aditya.adventuregame.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/battle")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BattleController {
    private final BattleService battleService;

    @PostMapping("/fight")
    public BattleResponse fight(@RequestBody BattleRequest request){
        return battleService.fight(request);
    }
}
