package com.example.AnonMe.api;

import com.example.AnonMe.database.CommentRepository;
import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.model.CommentEntry;
import com.example.AnonMe.model.PostEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/comments")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository post_repo;

    @GetMapping(path="/getAllComments")
    public List<CommentEntry> getAllPosts(@RequestParam String postId){
        return commentRepository.getPostComments(postId);
    }

    @GetMapping(path="/getAllCommentsT")
    public List<CommentEntry> getAllPosts(@RequestParam String postId, @RequestParam String screenname){
        if (screenname == null) return commentRepository.getPostComments(postId);
        return commentRepository.getPostComments(postId,screenname);
    }

    @PostMapping(path="/insertComment")
    public void insertPost(@RequestBody CommentEntry commentEntry){
        System.out.println(commentEntry.getScreen_name());
        commentRepository.insertComment(commentEntry);
    }

    @PostMapping(path="/LikeComment")
    public boolean LikePost(@RequestParam String id, @RequestParam String screenName){
        return post_repo.postLike(id,screenName);
    }

    @PostMapping(path="/FlagComment")
    public boolean FlagPost(@RequestParam String id, @RequestParam String screenName){
        return post_repo.postFlag(id,screenName);
    }
}
