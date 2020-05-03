package com.example.AnonMe.api;


import com.example.AnonMe.service.AudioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path="/audio")
public class AudioController {

    AudioService audioService = new AudioService();

    @PostMapping(path="/postAudio")
    public void insertPost(@RequestParam("file") MultipartFile file, @RequestParam("name") String name) {
        audioService.saveAudio(file, name);
    }
}
