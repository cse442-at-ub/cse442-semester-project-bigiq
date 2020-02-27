package com.example.AnonMe.api;

import com.example.AnonMe.service.PhoneVerification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/verify")
public class PhoneVerificationController {

    PhoneVerification verification = new PhoneVerification();

    @GetMapping(path="/phoneVerification")
    public int initialize(@RequestParam String phoneNumber){
        return verification.sendCode(phoneNumber);
    }

    @GetMapping(path = "/checkCode")
    public int checkCode(@RequestParam String phoneNumber, @RequestParam String code){
        return verification.checkVerification(phoneNumber, code);
    }
}
