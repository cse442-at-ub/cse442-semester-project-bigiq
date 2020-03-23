package com.example.AnonMe.api;
import com.example.AnonMe.model.UserEntry;
import com.example.AnonMe.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path="/users")
public class UserController {

    @Autowired
    UserRepository user_repo;

    @GetMapping(path="/getusers")
    public List<UserEntry> getUsers(){
       return user_repo.getAllUsers();
    }

    @GetMapping(path="/checkname")
    public HashMap<String, String> checkName(@RequestParam String screenName){
        HashMap<String, String> response = new HashMap<>();
        response.put("status", Integer.toString(user_repo.verifyName(screenName)));
        return response;
    }
    @GetMapping(path="/getUserScreen")
    public UserEntry getUserScreen(@RequestParam String screenName){
        System.out.println(screenName);
        return user_repo.getUserScreen(screenName.trim());
    }
    @GetMapping(path="/getCheckUserExist")
    public HashMap<String, String> getCheckUserExist(@RequestParam String phoneNumber){
        HashMap<String, String> response = new HashMap<>();
        UserEntry entry = user_repo.getUser(phoneNumber);
        if(entry == null) response.put("screenName", "null");
        else response.put("screenName", entry.getScreen_name());
        return response;
    }

    @PostMapping(path="/adduser")
    public void addUser(@RequestBody UserEntry userEntry){
        user_repo.insertUser(userEntry);
    }
    @DeleteMapping(path="/removeuser")
    public void removeUser(@RequestBody UserEntry userEntry){
        user_repo.removeUser(userEntry);
    }


}
