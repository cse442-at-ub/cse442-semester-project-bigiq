package com.example.AnonMe.api;

import com.example.AnonMe.database.GroupRepository;
import com.example.AnonMe.database.MessageRepository;
import com.example.AnonMe.model.GroupEntry;
import com.example.AnonMe.model.MessageEntry;
import com.example.AnonMe.model.PostEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(path="/groups/messages")
public class MessageController {

    @Autowired
    MessageRepository message_repo;

    @PostMapping(path="/insertMessage")
    public void insertMessage(@RequestBody MessageEntry messageEntry){
        message_repo.insertMessage(messageEntry);
    }

    @GetMapping(path="/getAllMessages")
    public List<MessageEntry> getAllMessages(){
        return message_repo.getAllMessages();
    }

    @GetMapping(path="/getMessages")
    public List<MessageEntry> getMessages(@RequestParam String screenname, @RequestParam String groupname){
        return message_repo.getMessages(screenname,groupname);
    }

    /*@GetMapping(path="/lastMessage")
    public MessageEntry lastMessage(@RequestParam String screenname, @RequestParam String groupname){
        return message_repo.lastMessage(screenname,groupname);
    }*/

    @GetMapping(path="/lastMessages")
    public List<MessageEntry> lastMessages(@RequestParam String screenname){
        return message_repo.lastMessages(screenname);
    }
}
