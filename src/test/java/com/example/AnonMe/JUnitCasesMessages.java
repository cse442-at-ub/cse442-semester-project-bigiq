package com.example.AnonMe;

import com.example.AnonMe.database.GroupRepository;
import com.example.AnonMe.database.MessageRepository;
import com.example.AnonMe.database.UserRepository;
import com.example.AnonMe.model.GroupEntry;
import com.example.AnonMe.model.MessageEntry;
import com.example.AnonMe.model.UserEntry;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertTrue;

public class JUnitCasesMessages {
    protected GroupEntry group1;
    protected MessageEntry message1,message2;
    protected UserEntry user;

    @Autowired
    protected UserRepository userrepo;

    @Autowired
    protected MessageRepository msgrepo;

    @Autowired
    protected GroupRepository grouprepo;

    @Before
    public void setUp(){
        group1 = new GroupEntry("1111111","Group 1", "groupdesc", false, "img", 0);
        user = new UserEntry("3474358889","USERTEST");
        message1 = new MessageEntry("1133",user,"Hi Test posting here", (long) 0.00001,"none.jpg","",0,"Group 1");
    }

    @After
    public void TearDown(){
        msgrepo.remove(message1);
        userrepo.removeUser(user);
        grouprepo.removeGroup(group1);
    }

    @Test
    public void TestAdd(){
    }

    @Test
    public void TestRemoval(){
    }

}
