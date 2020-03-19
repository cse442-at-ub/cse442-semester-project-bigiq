package com.example.AnonMe.model;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class Post {
    String id;
    String time;
    String context;
    String author;
    int likes;
    //ArrayList<Comment> comments;

    @JsonCreator
    public Post(@JsonProperty("context")String context, @JsonProperty("author") String author){
        id = UUID.randomUUID().toString();
        time = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd h:mm a"));
        this.context = context;
        this.author = author;
        likes = 0;
    }

    @JsonCreator
    public Post(@JsonProperty("id")String id, @JsonProperty("context") String context,
                @JsonProperty("author") String author, @JsonProperty("time") String time, @JsonProperty("likes") int likes ){
        this.author = author;
        this.id = id;
        this.likes = likes;
        this.context = context;
        this.time = time;
    }

}
