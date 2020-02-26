package com.example.AnonMe.service;

import com.twilio.Twilio;
import com.twilio.base.ResourceSet;
import com.twilio.rest.verify.v2.Service;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;

public class PhoneVerification {
    private static final String SID = "AC1a742dd5e8dc1abf0e0d6fa29f82287c";
    private static final String token = "ec35496b8d7d5476b845ec3c55ffc3d2";
    private static String serviceSID;

    public PhoneVerification(){
        serviceSID = getServiceSID();
    }
    public String getServiceSID(){
        Twilio.init(SID, token);
        ResourceSet<Service> services = Service.reader().limit(20).read();
        for(Service record : services) {
            if(record.getFriendlyName().equals("Your AnonMe")){
                return record.getSid();
            }
        }
        return createNewServiceSID();
    }
    public String createNewServiceSID(){
        Twilio.init(SID, token);
        Service service = Service.creator("Your AnonMe").create();
        return service.getSid();
    }

    public int sendCode(String phoneNumber){
        try {
            Twilio.init(SID, token);
            Verification verification = Verification.creator(
                    serviceSID,
                    phoneNumber,
                    "sms")
                    .create();
            return 1;
        }catch (com.twilio.exception.ApiException exception){
            return 0;
        }
    }
    public int checkVerification(String phoneNumber, String userCode){
        Twilio.init(SID, token);
        VerificationCheck verificationCheck = VerificationCheck.creator(
                serviceSID,
                userCode)
                .setTo(phoneNumber).create();
        if(!verificationCheck.getStatus().equals("approved")){
            return 0;
        }
        return 1;
    }
}
