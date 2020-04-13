package com.example.AnonMe.api;

import com.example.AnonMe.database.GroupRepository;
import com.example.AnonMe.model.GroupEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path="/groups")
public class GroupController {
    @Autowired
    GroupRepository repo;

    @PostMapping(path="/insertGroup")
    public void AddGroup(@RequestBody GroupEntry groupentry){
        repo.AddGroupToDB(groupentry);
    }

    @PostMapping(path="/addUser")
    public void AddUser(@RequestParam String screenname, @RequestParam String group_name){
        repo.AddUserToGroup(screenname,group_name);
    }

    @PostMapping(path="/removeUser")
    public void RemoveUser(@RequestParam String screenname, @RequestParam String group_name){
        repo.RemoveUserFromGroup(screenname,group_name);
    }

    @GetMapping(path="/getusergroups")
    public List<GroupEntry> GetUserGroups(@RequestParam String screenName){
        return repo.getUserGroups(screenName);
    }

    @GetMapping(path="/getallgroups")
    public List<GroupEntry> GetAllGroups(){
        return repo.getAllGroups();
    }

    @GetMapping(path="/getallgroups")
    public List<GroupEntry> GetAllGroups(@RequestParam String screenname){
        if (screenname == null) return repo.getAllGroups();
        else return (repo.getAllGroups(screenname));
    }
}
