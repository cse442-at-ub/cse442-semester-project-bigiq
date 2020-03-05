package com.example.AnonMe.api;

import com.example.AnonMe.service.PhoneVerification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping(path="/verify")
public class PhoneVerificationController {

    PhoneVerification verification = new PhoneVerification();

    @GetMapping(path="/phoneVerification")
    public HashMap<String, String> initialize(@RequestParam String phoneNumber){
        HashMap<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(verification.sendCode(phoneNumber)));
        return response;
    }

    @GetMapping(path = "/phoneVerificationCheck")
    public HashMap<String, String> checkCode(@RequestParam String phoneNumber, @RequestParam String code){
        HashMap<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(verification.checkVerification(phoneNumber, code)));
        return response;
    }
}
