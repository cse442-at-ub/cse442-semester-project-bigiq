package com.example.AnonMe.service;

import com.twilio.Twilio;
import com.twilio.base.ResourceSet;
import com.twilio.rest.verify.v2.Service;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;

import java.util.HashMap;

public class PhoneVerification {
    private static final String SID = "AC59f69c95631b95751498be0a64cab821";
    private static final String token = "ca4485b1b8e6acad1e03bfe6a0b2d982";
    private static String serviceSID;
    private static HashMap<String, Integer> attempts;

    public PhoneVerification(){
        serviceSID = getServiceSID();
        attempts = new HashMap<>();
    }
    private static String getServiceSID(){
        Twilio.init(SID, token);
        ResourceSet<Service> services = Service.reader().limit(20).read();
        for(Service record : services) {
            if(record.getFriendlyName().equals("AnonMe")){
                return record.getSid();
            }
        }
        return createNewServiceSID();
    }
    private static String createNewServiceSID(){
        Twilio.init(SID, token);
        Service service = Service.creator("AnonMe").create();
        return service.getSid();
    }

    public int sendCode(String phoneNumber){
        if(phoneNumber.length() < 10){
            return 2;
        }
        try {
            String checkedNumber = checkNumber(phoneNumber);
            attempts.put(checkedNumber, 0);
            Twilio.init(SID, token);
            Verification verification = Verification.creator(
                    serviceSID,
                    checkedNumber,
                    "sms")
                    .create();
            return 0;
        }catch (com.twilio.exception.ApiException exception){
            exception.printStackTrace();
            return 1;
        }
    }
    /*
        0 = Success
        1 = Fail
        2 = Max Attempt
     */
    public int checkVerification(String phoneNumber, String userCode){
        String checkedNumber = checkNumber(phoneNumber);
        if(attempts.get(checkedNumber) > 3){
            return 2;
        }
        attempts.replace(checkedNumber,  attempts.get(checkedNumber) + 1);
        Twilio.init(SID, token);
        VerificationCheck verificationCheck = VerificationCheck.creator(
                serviceSID,
                userCode)
                .setTo(checkedNumber).create();
        if(!verificationCheck.getStatus().equals("approved")){
            return 1;
        }
        return 0;
    }

    private static String checkNumber(String phoneNumber){
        StringBuilder number = new StringBuilder(phoneNumber);
        if(number.charAt(0) != '+'){
            number.insert(0, '+');
        }
        if(number.charAt(1) != '1'){
            number.insert(1, '1');
        }
        return number.toString();
    }
}
