package com.example.AnonMe.model;

public class UserEntry {
    private String phone_number;
    private String screen_name;

    public UserEntry() {
    }

    public UserEntry(String phone_number, String screen_name) {
        this.phone_number = phone_number;
        this.screen_name = screen_name;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public String getScreen_name() {
        return screen_name;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setScreen_name(String screen_name) {
        this.screen_name = screen_name;
    }

    @Override
    public String toString() {
        return "UserEntry{" +
                "phone_number='" + phone_number + '\'' +
                ", screen_name='" + screen_name + '\'' +
                '}';
    }
}
