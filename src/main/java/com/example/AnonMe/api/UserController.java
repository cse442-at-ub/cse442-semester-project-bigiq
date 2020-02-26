package com.example.AnonMe.api;
import com.example.AnonMe.model.UserEntry;
import com.example.AnonMe.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="/users")
public class UserController {

    @Autowired
    UserRepository user_repo;

    @GetMapping(path="/getusers")
    public List<String> getUsers(){
        List<UserEntry> tmp = user_repo.getAllUsers();
        List<String> ret = new ArrayList<>();
        for (UserEntry a : tmp){
            ret.add(a.toString());
        }

        return ret;
    }

    @GetMapping(path="/addusertest")
    public List<String> addUser(){
        UserEntry TestEntry = new UserEntry("135-556-1124","LmaoWho");
        int flag = user_repo.insertUser(TestEntry);
        List<String> ret = getUsers();

        if (flag == 0){
            ret.add("USER SELECTED ALREADY REGISTERED");
        }

        return ret;
    }

    @GetMapping(path="/removeusertest")
    public List<String> removeUser(){
        UserEntry TestEntry = new UserEntry("135-556-1124","LmaoWho");
        int flag = user_repo.removeUser(TestEntry);
        List<String> ret = getUsers();

        if (flag == 0){
            ret.add("USER SELECTED DOES NOT EXIST");
        }

        return ret;
    }


}
