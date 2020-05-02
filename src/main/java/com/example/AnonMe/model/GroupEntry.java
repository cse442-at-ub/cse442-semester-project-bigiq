package com.example.AnonMe.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;


public class GroupEntry {
    String group_id;
    String group_name;
    String group_desc;
    String image;
    UserEntry OwnerModerator;
    int memberCount;
    PostEntry LastMessage;
    boolean button = false;

    public GroupEntry(){
    }

    @JsonCreator
    public GroupEntry(@JsonProperty("id") String group_id, @JsonProperty("group_name") String group_name,
                      @JsonProperty("group_desc") String group_desc, @JsonProperty("button") boolean button,
                      @JsonProperty("image") String image, @JsonProperty("memberCount") int memberCount) {
        if(group_id == null){
            this.group_id = UUID.randomUUID().toString();
            this.memberCount = 0;
            this.button = true;
        }else {
            this.group_id = group_id;
            this.memberCount = memberCount;
            this.button = button;
        }
        this.group_name = group_name;
        this.image = image;
        this.group_desc = group_desc;
    }

    public String getGroup_id() {
        return group_id;
    }

    public void setGroup_id(String group_id) {
        this.group_id = group_id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public String getGroup_desc() {
        return group_desc;
    }

    public void setGroup_desc(String group_desc) {
        this.group_desc = group_desc;
    }

    public boolean isButton() {
        return button;
    }

    public void setButton(boolean button) {
        this.button = button;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UserEntry getOwnerModerator() {
        return OwnerModerator;
    }

    public void setOwnerModerator(UserEntry ownerModerator) {
        OwnerModerator = ownerModerator;
    }

    public int getmemberCount() {
        return memberCount;
    }

    public void setmemberCount(int memberCount) {
        this.memberCount = memberCount;
    }
}
