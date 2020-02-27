package com.example.AnonMe.api;
import com.example.AnonMe.model.UserEntry;
import com.example.AnonMe.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
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

    @PutMapping(path="/adduser")
    public void addUser(@RequestParam String phoneNumber, @RequestParam String screenName){
        UserEntry TestEntry = new UserEntry(phoneNumber,screenName);
        user_repo.insertUser(TestEntry);
    }

    @DeleteMapping(path="/removeuser")
    public void removeUser(@RequestParam String phoneNumber, @RequestParam String screenName){
        UserEntry TestEntry = new UserEntry(phoneNumber,screenName);
        user_repo.removeUser(TestEntry);
    }


}
