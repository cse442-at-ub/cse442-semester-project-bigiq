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
    List<PostEntry> temp = new ArrayList<>();

    @GetMapping(path="/getAllPosts")
    public List<PostEntry> getAllPosts(){
        return temp;
        //return postRepository.getAllPosts();
    }
    @PostMapping(path="/insertPost")
    public void insertPost(@RequestBody PostEntry postEntry){
        temp.add(postEntry);
        //postRepository.insertPost(postEntry);
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
        return postRepository.getPostsRecent(amount);
    }
    @GetMapping(path="/postsByPhone")
    public List<PostEntry> postsByPhone(@RequestParam String phoneNumber){
        return postRepository.getPostsPnum(phoneNumber);
    }
}
