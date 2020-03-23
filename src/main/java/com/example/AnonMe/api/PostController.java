package com.example.AnonMe.api;

import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.model.PostEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/posts")
public class PostController {
    @Autowired
    PostRepository postRepository;


    @GetMapping(path="/getAllPosts")
    public List<PostEntry> getAllPosts(){
        return postRepository.getAllPosts(50);
    }
    @PostMapping(path="/insertPost")
    public void insertPost(@RequestBody PostEntry postEntry){
        postEntry.setScreenName(postEntry.getScreenName().trim());
        postRepository.insertPost(postEntry);
    }

    @PostMapping(path="/LikePost")
    public boolean LikePost(@RequestParam String id, @RequestParam String user){
        return postRepository.postLike(id,user);
    }
    @PostMapping(path="/FlagPost")
    public boolean FlagPost(@RequestParam String id, @RequestParam String user){
        return postRepository.postFlag(id,user);
    }


    @DeleteMapping(path="/deletePostByID")
    public void deletePost(@RequestParam String id){
        postRepository.removePostID(id);
    }
    @DeleteMapping(path="/deleteAllAuthorPosts")
    public void deleteAllAuthorPost(@RequestParam String phoneNumber){
        postRepository.removePost(phoneNumber);
    }
    @GetMapping(path="/postsByScreenName")
    public List<PostEntry> postByScreenName(@RequestParam String screenName){
        return postRepository.getPostsAuth(screenName);
    }
    @GetMapping(path="/recentPosts")
    public List<PostEntry> recentPosts(@RequestParam int amount){
        return postRepository.getPostsRecent(amount,50);
    }
    @GetMapping(path="/mostLikedPosts")
    public List<PostEntry> mostLikedPosts(){
        return postRepository.getPostsLiked(25,50);
    }
    @GetMapping(path="/postsByPhone")
    public List<PostEntry> postsByPhone(@RequestParam String phoneNumber){
        return postRepository.getPostsPnum(phoneNumber);
    }
}
