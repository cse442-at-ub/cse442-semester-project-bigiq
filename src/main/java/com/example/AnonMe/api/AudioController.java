package com.example.AnonMe.api;


import com.example.AnonMe.database.AudioRepository;
import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.model.AudioEntry;
import com.example.AnonMe.service.AudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path="/audio")
public class AudioController {

    AudioService audioService = new AudioService();

    @Autowired
    AudioRepository audiorepo;

    @Autowired
    PostRepository post_repo;


    @PostMapping(path="/insertAudio")
    public void insertAudio(@RequestParam("file") MultipartFile file, @RequestParam("screenname") String name){
        AudioEntry audioentry = new AudioEntry();
        String postId = UUID.randomUUID().toString();
        audioentry.setPost_id(postId);
        audioentry.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd',' h:mm a")));
        String baseUrl = "https://anonmebucket.s3.us-east-2.amazonaws.com/Audio/";
        audioentry.setDuration(audioService.saveAudio(file, postId));
        audioentry.setScreenName(name);
        audioentry.setContent(baseUrl + postId + ".mp3");
        audiorepo.insertPost(audioentry);
    }

    @PostMapping(path="/removeAudio")
    public void removeAudio(@RequestBody AudioEntry audioentry){
        audiorepo.removePost(audioentry);
    }

    @GetMapping(path="/getAudioRecent")
    public List<AudioEntry> getAudioRecent(@RequestParam String screenname){
        if (screenname == null) return audiorepo.getPosts(false);
        return audiorepo.getPosts(screenname,false);
    }

    @GetMapping(path="/getAudioLike")
    public List<AudioEntry> getAudioLike(@RequestParam String screenname){
        if (screenname == null) return audiorepo.getPosts(true);
        return audiorepo.getPosts(screenname,true);
    }

    @PostMapping(path="/LikePost")
    public boolean LikePost(@RequestParam String id, @RequestParam String screenName){
        return post_repo.postLike(id,screenName);
    }
    @PostMapping(path="/FlagPost")
    public boolean FlagPost(@RequestParam String id, @RequestParam String screenName){
        return post_repo.postFlag(id,screenName);
    }
}
