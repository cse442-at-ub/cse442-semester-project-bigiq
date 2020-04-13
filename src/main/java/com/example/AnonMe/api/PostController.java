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
    public List<PostEntry> getAllPosts(@RequestParam String user){
        if (user == null) return postRepository.getAllPosts(50);
        else return postRepository.getAllPosts(50, user);
    }
    @GetMapping(path="/postsByScreenName")
    public List<PostEntry> postByScreenName(@RequestParam String screenName){
        return postRepository.getPostsAuth(screenName);
    }
    @GetMapping(path="/recentPosts")
    public List<PostEntry> recentPosts(@RequestParam String screenName){
        return postRepository.getPostsRecent(25,50,screenName);
    }
    @GetMapping(path="/mostLikedPosts")
    public List<PostEntry> mostLikedPosts(@RequestParam String screenName){
        return postRepository.getPostsLiked(25,50,screenName);
    }
    @GetMapping(path="/postsByPhone")
    public List<PostEntry> postsByPhone(@RequestParam String phoneNumber){
        return postRepository.getPostsPnum(phoneNumber);
    }
    @GetMapping(path="/postById")
    public PostEntry postById(@RequestParam String id){
        System.out.println(id);
        return postRepository.getPostID(id);
    }
    @PostMapping(path="/insertPost")
    public void insertPost(@RequestBody PostEntry postEntry){
        postEntry.setScreenName(postEntry.getScreenName().trim());
        postRepository.insertPost(postEntry);
    }
    @PostMapping(path="/LikePost")
    public boolean LikePost(@RequestParam String id, @RequestParam String screenName){
        System.out.println("liked");
        return postRepository.postLike(id,screenName);
    }
    @PostMapping(path="/FlagPost")
    public boolean FlagPost(@RequestParam String id, @RequestParam String screenName){
        return postRepository.postFlag(id,screenName);
    }
    @GetMapping(path="/PostInterest")
    public List<PostEntry> PostInterest(@RequestParam String screenName){
        return postRepository.postInterest(screenName);
    }
    @DeleteMapping(path="/deletePostByID")
    public void deletePost(@RequestParam String id){
        postRepository.removePostID(id);
    }
    @DeleteMapping(path="/deleteAllAuthorPosts")
    public void deleteAllAuthorPost(@RequestParam String phoneNumber){
        postRepository.removePost(phoneNumber);
    }

}
