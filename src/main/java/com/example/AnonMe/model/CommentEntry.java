package com.example.AnonMe.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class CommentEntry {
    private String comment_id;
    private String post_id;
    private String screen_name;
    private String content;
    private String timestamp_front;
    private boolean like_button = false;
    private boolean flag_button = false;
    private int like_ctr = 0;
    private int flag_ctr = 0;

    public CommentEntry(){}

    @JsonCreator
    public CommentEntry (@JsonProperty("id") String comment_id, @JsonProperty("post_id") String post_id, @JsonProperty("content") String content,
                         @JsonProperty("author") String screen_name, @JsonProperty("timestamp") String timestamp_front){
        //new comment handling
        if (comment_id == null) {
            this.comment_id = UUID.randomUUID().toString();
            this.timestamp_front = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a"));
        }
        else{
            this.comment_id = comment_id;
            this.timestamp_front = timestamp_front;
        }

        this.post_id = post_id;
        this.screen_name = screen_name;
        this.content = content;
    }

    public String getComment_id() {
        return comment_id;
    }

    public void setComment_id(String comment_id) {
        this.comment_id = comment_id;
    }

    public String getPost_id() {
        return post_id;
    }

    public void setPost_id(String post_id) {
        this.post_id = post_id;
    }

    public String getScreen_name() {
        return screen_name;
    }

    public void setScreen_name(String screen_name) {
        this.screen_name = screen_name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp_front() {
        return timestamp_front;
    }

    public void setTimestamp_front(String timestamp_front) {
        this.timestamp_front = timestamp_front;
    }

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

    public int getLike_ctr() {
        return like_ctr;
    }

    public void setLike_ctr(int like_ctr) {
        this.like_ctr = like_ctr;
    }

    public int getFlag_ctr() {
        return flag_ctr;
    }

    public void setFlag_ctr(int flag_ctr) {
        this.flag_ctr = flag_ctr;
    }
}
