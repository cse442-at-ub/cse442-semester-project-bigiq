package com.example.AnonMe.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class UserEntry {
    private String phoneNumber;
    private String screenName;
    private List<UUID> following;
    private List<UUID> userPost;

    @JsonCreator
    public UserEntry(@JsonProperty("phoneNumber") String phoneNumber, @JsonProperty("screenName") String screenName) {
        this.phoneNumber = phoneNumber;
        this.screenName = screenName;
        this.following = new LinkedList<>();
        this.userPost = new LinkedList<>();
    }

    public String getPhone_number() {
        return phoneNumber;
    }

    public String getScreen_name() {
        return screenName;
    }

    public void setPhone_number(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setScreen_name(String screenName) {
        this.screenName = screenName;
    }
}
