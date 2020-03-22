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
    private String timestampDB;

    /*@JsonCreator
    public PostEntry(@JsonProperty("author") String author, @JsonProperty("content") String content){

    }*/

    @JsonCreator
    public PostEntry(@JsonProperty("id") String post_id, @JsonProperty("author") String author, @JsonProperty("content") String content,
                     @JsonProperty("time") String timestamp, @JsonProperty("likes") int likes, @JsonProperty("flag_ctr") int flag_ctr,
                     @JsonProperty("timeDB") String timestampDB) {
        if(post_id == null){
            this.post_id = UUID.randomUUID().toString();
            this.timestampDB = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-d H:m:s"));
            this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a"));
            this.author = author;
            this.content = content;
        }else {
            this.post_id = post_id;
            this.author = author;
            this.content = content;
            this.flag_ctr = flag_ctr;
            this.like_ctr = likes;
            this.timestamp = timestamp;
        }
    }

    public String getPost_id() {
        return post_id;
    }

    public void setPost_id(String post_id) {
        this.post_id = post_id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {return author; }

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

    public String getTimestamp() { return timestamp; }

    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
