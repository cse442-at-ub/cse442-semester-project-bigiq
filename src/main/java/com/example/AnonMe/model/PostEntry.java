package com.example.AnonMe.model;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

public class PostEntry {
    private String post_id;
    private String author;
    private String content;
    private int flag_ctr = 0;
    private int like_ctr = 0;
    private String timestamp;
    private boolean like_button = false;
    private boolean flag_button = false;

    public PostEntry(){
    }

    @JsonCreator
    public PostEntry(@JsonProperty("id") String post_id, @JsonProperty("author") String screen_name, @JsonProperty("content") String content,
                     @JsonProperty("flag_ctr") int flag_ctr, @JsonProperty("likes") int like_ctr, @JsonProperty("time") String timestampFront,
                     @JsonProperty("like_button") boolean liked, @JsonProperty("flag_button") boolean flagged) {
        if(post_id == null){
            this.post_id = UUID.randomUUID().toString();
            this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a"));
            this.author = screen_name;
            this.content = content;
        }else {
            this.post_id = post_id;
            this.author = screen_name;
            this.content = content;
            this.flag_ctr = flag_ctr;
            this.like_ctr = like_ctr;
            this.timestamp = timestampFront;
            this.flag_button = flagged;
            this.like_button = liked;
        }
    }

    public String getPost_id() {
        return post_id;
    }

    public void setPost_id(String post_id) {
        this.post_id = post_id;
    }

    public void setScreenName(String author) {
        this.author = author;
    }

    public String getScreenName() {return author; }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getFlag_ctr() {
        return flag_ctr;
    }

    public void setFlag_ctr(int flag_ctr) {
        this.flag_ctr = flag_ctr;
    }

    public int getLike_ctr() {
        return like_ctr;
    }

    public void setLike_ctr(int like_ctr) {
        this.like_ctr = like_ctr;
    }

    public String getTimestampFront() { return timestamp; }

    public void setTimestampFront(String timestamp) { this.timestamp = timestamp; }

    public boolean isLike_button() {
        return like_button;
    }

    public void setLike_button(boolean like_button) {
        this.like_button = like_button;
    }

    public boolean isFlag_button() {
        return flag_button;
    }

    public void setFlag_button(boolean flag_button) {
        this.flag_button = flag_button;
    }
}
