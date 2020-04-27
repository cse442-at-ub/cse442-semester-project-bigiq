package com.example.AnonMe.api;

import com.example.AnonMe.database.CommentRepository;
import com.example.AnonMe.model.CommentEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/comments")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @GetMapping(path="/getAllComments")
    public List<CommentEntry> getAllPosts(@RequestParam String postId){
        return commentRepository.getPostComments(postId);
    }
    @PostMapping(path="/insertComment")
    public void insertPost(@RequestBody CommentEntry commentEntry){
        System.out.println(commentEntry.getScreen_name());
        commentRepository.insertComment(commentEntry);
    }
}
