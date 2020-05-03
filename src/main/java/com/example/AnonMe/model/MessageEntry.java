package com.example.AnonMe.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class MessageEntry {
    private String message_id;
    private String group_name;
    private UserEntry user;
    private String content;
    private String timestamp;
    private String image;
    private String video;
    private String group_icon;
    private boolean authored = false;
    private int duration;

    public MessageEntry(){
        user = new UserEntry();
    };

    @JsonCreator
    public MessageEntry(@JsonProperty("messageId") String id, @JsonProperty("user") UserEntry user,
                        @JsonProperty("content") String content, @JsonProperty("timestamp") String timestamp,
                        @JsonProperty("image") String image, @JsonProperty("video") String video,
                        @JsonProperty("duration") int duration, @JsonProperty ("group_name") String group_name){
        if(id == null){
            this.message_id = UUID.randomUUID().toString();
            this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a"));
        }else {
            this.message_id = id;
            this.timestamp = timestamp;
        }
        this.group_name = group_name;
        this.user = user;
        this.content = content;
        this.image = image;
        this.video = video;
        this.duration = duration;
    }

    public String getGroupIcon() {
        return group_icon;
    }

    public void setGroupIcon(String group_icon) {
        this.group_icon = group_icon;
    }

    public boolean isAuthored(){
        return authored;
    }
    public void setAuthored(boolean authored){
        this.authored = authored;
    }

    public String getMessageId() {
        return message_id;
    }

    public void setMessageId(String message_id) {
        this.message_id = message_id;
    }

    public void set_id(String id){
        this.message_id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        //System.out.println("Huehhh??GET");
        //System.out.println(timestamp);
        return this.timestamp;
    }

    public void setTimestampfront(String timestamp) {
        //System.out.println("Huehhh??");
        //System.out.println(timestamp);
        this.timestamp = timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public UserEntry getUser() {
        return user;
    }

    public void setUser(UserEntry user) {
        this.user = user;
    }

    public void setScreenName(String screenname){
        this.user.setScreen_name(screenname);
    }
    public void setPhone_number(String phone_number){
        this.user.setPhone_number(phone_number);
    }
    /*public void setImage(String image){
        this.user.setImage();
    }*/

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
