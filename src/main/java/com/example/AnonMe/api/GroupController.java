package com.example.AnonMe.api;

import com.example.AnonMe.database.GroupRepository;
import com.example.AnonMe.model.GroupEntry;
import com.example.AnonMe.model.UserEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path="/groups")
public class GroupController {
    @Autowired
    GroupRepository repo;

    @PostMapping(path="/insertGroup")
    public void AddGroup(@RequestParam String screenname, @RequestBody GroupEntry groupentry){
        if (screenname == null) System.out.println("Guests cannot create new groups");
        else repo.AddGroupToDB(groupentry,screenname);
    }

    @PostMapping(path="/removeGroup")
    public void RemoveGroup(@RequestBody GroupEntry groupentry) { repo.removeGroup(groupentry); }

    @PostMapping(path="/addUser")
    public void AddUser(@RequestParam String screenname, @RequestParam String group_name){
        repo.AddUserToGroup(screenname,group_name, '0');
    }

    @PostMapping(path="/removeUser")
    public void RemoveUser(@RequestParam String screenname, @RequestParam String group_name){
        repo.RemoveUserFromGroup(screenname,group_name);
    }

    @GetMapping(path="/searchGroup")
    public List<GroupEntry> searchgroup(@RequestParam String keyword){
        return repo.SearchForGroup(keyword);
    }

    @GetMapping(path="/getusergroups")
    public List<GroupEntry> GetUserGroups(@RequestParam String screenName){
        return repo.getUserGroups(screenName);
    }

    @GetMapping(path="/getallgroups")
    public List<GroupEntry> GetAllGroups(@RequestParam String screenname){
        if (screenname == null) return repo.getAllGroups();
        else return (repo.getAllGroups(screenname));
    }

    @GetMapping(path="/getallusers")
    public List<String> GetAllUsers(@RequestParam String screenname, @RequestParam String group_name){
        return repo.getAllUsers(group_name,screenname);
    }

    @PostMapping(path="/changeImage")
    public void changeImage(@RequestParam String image, @RequestParam String group_name){
        repo.modifyGroup(group_name, image, "image");
    }

    @PostMapping(path="/changeDesc")
    public void changeDesc(@RequestParam String desc, @RequestParam String group_name){
        repo.modifyGroup(group_name, desc, "desc");
    }

    @PostMapping(path="/changeName")
    public void changeName(@RequestParam String name, @RequestParam String group_name){
        repo.modifyGroup(group_name, name, "name");
    }

    @PostMapping(path="/changeOwner")
    public void changeOwner(@RequestParam String screenname, @RequestParam String group_name){
        repo.modifyGroup(group_name, screenname, "owner");
    }

    @GetMapping(path="/verifyOwner")
    public boolean verifyOwner(@RequestParam String screenname, @RequestParam String group_name){
        return repo.verifyOwner(screenname, group_name);
    }

    @GetMapping(path="/getuserowned")
    public List<GroupEntry> getUserOwned(@RequestParam String screenname){
        return repo.getuserowned(screenname);
    }

    @GetMapping(path="/getTrending")
    public List<GroupEntry> getTrending(@RequestParam String screenname){
        return repo.getTrending(screenname);
    }
}
