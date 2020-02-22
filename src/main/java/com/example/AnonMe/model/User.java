package com.example.AnonMe.model;

import java.util.List;
import java.util.UUID;

public class User {
    private final UUID id;
    private final String tag;
    private String phoneNumber;
    private int likes;
    private int flag;

    public User(UUID id, String tag, String phoneNumber){
        this.id = id;
        this.tag = tag;
        this.phoneNumber = phoneNumber;
        likes = 0;
        flag = 0;
    }

    public int getLikes() {
        return likes;
    }
    public int getFlag() {
        return flag;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public UUID getId() {
        return id;
    }
    public String getTag() {
        return tag;
    }
}
