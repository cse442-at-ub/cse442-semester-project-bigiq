package com.example.AnonMe.service;

import com.example.AnonMe.database.S3DB;
import it.sauronsoftware.jave.AudioAttributes;
import it.sauronsoftware.jave.Encoder;
import it.sauronsoftware.jave.EncoderException;
import it.sauronsoftware.jave.EncodingAttributes;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class AudioService {

    public void saveAudio(MultipartFile file, String fileName) {
        if(!file.getContentType().contains("video")) System.out.println("Not a video");
        else {
            try {
                Path videoPath = Paths.get( "src/main/resources/VideoFiles/"+ fileName +".mp4");
                String audioPath = "src/main/resources/AudioFiles/"+ fileName +".mp3";
                Files.write(videoPath, file.getBytes());
                videoToAudio(videoPath.toString(), audioPath);
                S3DB db = new S3DB();
                db.uploadFile(audioPath, fileName);
                deleteAudioFiles();
                deleteVideoFiles();
            }catch (IOException e){
                e.printStackTrace();
            }
        }
    }
    private void deleteVideoFiles(){
        File folder = new File("src/main/resources/VideoFiles");
        File[] files = folder.listFiles();
        for (File file : files) {
            System.out.println(file.toString());
            file.delete();
        }
    }
    private void deleteAudioFiles(){
        File folder = new File("src/main/resources/AudioFiles");
        File[] files = folder.listFiles();
        for (File file : files) file.delete();
    }
    private void videoToAudio (String videoPath, String audioPath) {
        try {
            File source = new File(videoPath);
            File target = new File(audioPath);
            AudioAttributes audio = new AudioAttributes();
            audio.setCodec("libmp3lame");
            audio.setBitRate(128000);
            audio.setChannels(2);
            audio.setSamplingRate(44100);
            EncodingAttributes attrs = new EncodingAttributes();
            attrs.setFormat("mp3");
            attrs.setAudioAttributes(audio);
            Encoder encoder = new Encoder();
            encoder.encode(source, target, attrs);
            System.out.println("Convert video file to audio");
        }catch (EncoderException e){
            System.out.println(e.getMessage());
        }

    }

}
