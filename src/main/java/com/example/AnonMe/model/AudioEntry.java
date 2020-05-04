package com.example.AnonMe.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class AudioEntry {
    private String post_id;
    private String author;
    private String content;
    private int flag_ctr = 0;
    private int like_ctr = 0;
    private String timestamp;
    private boolean like_button = false;
    private boolean flag_button = false;
    private boolean play_button = false;
    private long duration;
    private long value = 0;

    public AudioEntry() {}

    @JsonCreator
    public AudioEntry(@JsonProperty("id") String post_id, @JsonProperty("author") String screen_name, @JsonProperty("content") String content,
                      @JsonProperty("flag_ctr") int flag_ctr, @JsonProperty("likes") int like_ctr, @JsonProperty("time") String timestampFront,
                      @JsonProperty("like_button") boolean liked, @JsonProperty("flag_button") boolean flagged,
                      @JsonProperty("duration") long duration){
        if(post_id == null){
            this.post_id = UUID.randomUUID().toString();
            this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a"));
        }else {
            this.post_id = post_id;
            this.timestamp = timestampFront;
        }
        this.author = screen_name;
        this.content = content;
        this.flag_ctr = flag_ctr;
        this.like_ctr = like_ctr;
        this.flag_button = flagged;
        this.like_button = liked;
        this.duration = duration;
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

    public String getScreenName() {
        return author;
    }

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

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
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

    public boolean isPlay_button() {
        return play_button;
    }

    public void setPlay_button(boolean play_button) {
        this.play_button = play_button;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public long getValue() {
        return value;
    }

    public void setValue(long value) {
        this.value = value;
    }
}
