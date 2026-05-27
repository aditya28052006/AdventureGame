package com.aditya.adventuregame.controller;


import com.aditya.adventuregame.dto.AuthResponse;
import com.aditya.adventuregame.dto.LoginRequest;
import com.aditya.adventuregame.dto.RegisterRequest;
import com.aditya.adventuregame.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

}
