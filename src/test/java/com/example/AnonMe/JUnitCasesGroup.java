package com.example.AnonMe;
import com.example.AnonMe.database.GroupRepository;
import com.example.AnonMe.database.UserRepository;
import com.example.AnonMe.model.CommentEntry;
import com.example.AnonMe.model.PostEntry;
import com.example.AnonMe.model.UserEntry;
import com.example.AnonMe.model.GroupEntry;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class JUnitCasesGroup extends TestCase {
    protected GroupEntry group1, group2;
    protected UserEntry user;

    @Autowired
    protected UserRepository userrepo;

    @Autowired
    protected GroupRepository grouprepo;

    @Before
    public void setUp(){
        group1 = new GroupEntry("1111111","Group 1");
        group2 = new GroupEntry("2222222","Group 2");
        user = new UserEntry("3474358889","USERTEST");
    }

    @After
    public void tearDown(){
        userrepo.removeUser(user);
        grouprepo.removeGroup(group1);
        grouprepo.removeGroup(group2);
    }


    @Test
    public void TestAdd(){
        assertTrue(grouprepo.getAllGroups().size() == 0);
        grouprepo.AddGroupToDB(group1);
        assertTrue(grouprepo.getAllGroups().size() == 1);
        grouprepo.AddGroupToDB(group2);
        assertTrue(grouprepo.getAllGroups().size() == 2);
    }

    @Test
    public void TestRemoval(){
        grouprepo.AddGroupToDB(group1);
        grouprepo.AddGroupToDB(group2);
        assertTrue(grouprepo.getAllGroups().size() == 2);
        grouprepo.removeGroup(group1);
        assertTrue(grouprepo.getAllGroups().size() == 1);
        grouprepo.removeGroup(group2);
        assertTrue(grouprepo.getAllGroups().size() == 0);
    }


    @Test
    public void TestUserAdd(){
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 0);
        grouprepo.AddUserToGroup(user.getScreen_name(),group1.getGroup_name());
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 1);
        grouprepo.AddUserToGroup(user.getScreen_name(),group2.getGroup_name());
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 2);
    }

    @Test
    public void TestUserRemoval(){
        grouprepo.AddUserToGroup(user.getScreen_name(),group1.getGroup_name());
        grouprepo.AddUserToGroup(user.getScreen_name(),group2.getGroup_name());
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 2);
        grouprepo.RemoveUserFromGroup(user.getScreen_name(),group1.getGroup_name());
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 1);
        grouprepo.RemoveUserFromGroup(user.getScreen_name(),group2.getGroup_name());
        assertTrue(grouprepo.getUserGroups(user.getScreen_name()).size() == 0);
    }

    public static void main(String[] args) {JUnitCore.runClasses(JUnitCasesUser.class);}

}
