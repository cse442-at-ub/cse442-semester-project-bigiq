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
    boolean button = false;

    public GroupEntry(){
    }

    @JsonCreator
    public GroupEntry(@JsonProperty("id") String group_id, @JsonProperty("group_name") String group_name, @JsonProperty("button") boolean button) {
        if(group_id == null){
            this.group_id = UUID.randomUUID().toString();
            this.group_name = group_name;
        }else {
            this.group_id = group_id;
            this.group_name = group_name;
            this.button = button;
        }

        this.group_desc = "";
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
}
