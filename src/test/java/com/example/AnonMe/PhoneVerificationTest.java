package com.example.AnonMe;

import com.example.AnonMe.service.PhoneVerification;

public class PhoneVerificationTest {
    public static void main(String[] args) {
        testGetSID();
        testSendCode();
        testCheckCode();
        testFormatNumber();
    }

    public static void testGetSID(){
        PhoneVerification phoneVerification = new PhoneVerification();
        String currentSID = phoneVerification.getSID();
        assert (currentSID != phoneVerification.createNewServiceSID());
    }
    public static void testSendCode(){
        PhoneVerification phoneVerification = new PhoneVerification();
        String shortNumber = "123";
        String longNumber = "123456789012321433";
        String realNumber = "3476693814";
        assert (phoneVerification.sendCode(shortNumber) == 2);
        assert (phoneVerification.sendCode(longNumber) == 2);
        assert (phoneVerification.sendCode(realNumber) == 0);
    }
    public static void testCheckCode(){
        PhoneVerification phoneVerification = new PhoneVerification();
        assert (phoneVerification.checkVerification("3479990121", "123445") == 3);
        for(int i = 0; i<3; i++){
            phoneVerification.checkVerification("3476693814", "123455");
        }
        assert (phoneVerification.checkVerification("3476693814", "123455")== 2);
    }
    public static void testFormatNumber(){
        PhoneVerification phoneVerification = new PhoneVerification();
        assert (phoneVerification.checkNumber("3476693814").equals("+13476693814"));
        assert (phoneVerification.checkNumber("13476693814").equals("+13476693814"));
        assert (phoneVerification.checkNumber("+13476693814").equals("+13476693814"));

    }

}
