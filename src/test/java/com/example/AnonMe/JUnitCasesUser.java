package com.example.AnonMe;

import com.example.AnonMe.database.UserRepository;
import com.example.AnonMe.model.UserEntry;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class JUnitCasesUser extends TestCase {
    protected UserEntry user1, user2;

    @Autowired
    protected UserRepository repo;

    @Before
    public void setUp(){
        user1 = new UserEntry("3474152222","dumby1");
        repo.removeUser(user1);
        user2 = new UserEntry("3225112444","dumby2");
        repo.removeUser(user2);

    }

    @Test
    public void testInsertUser(){ //TEST #1

        //Asserting user insertions are properly executed.
        assertFalse("False expected, user does not exist.",repo.getAllUsers().contains(user1));
        assertEquals("0 expected, new user insertion",0,repo.insertUser(user1));

        //Asserting duplicates are not being accepted by system.
        assertTrue("True expected, user should exist in DB", repo.getUser(user1.getPhone_number()) != null);
        assertEquals("1 expected, user overlap found",1,repo.insertUser(user1));

        //Repeat test with different input
        assertFalse("False expected, user does not exist.",repo.getAllUsers().contains(user2));
        assertEquals("0 expected, new user insertion",0,repo.insertUser(user2));
        assertTrue("True expected, user should exist in DB", repo.getUser(user2.getPhone_number()) != null);
        assertEquals("1 expected, user overlap found",1,repo.insertUser(user2));
    }

    @Test
    public void testRemoveUser(){

        //Asserting user removals are properly executed.
        assertFalse("False expected, user removed on setUp.", repo.getAllUsers().contains(user1));
        assertEquals("1 expected, removal of non-existant user",1,repo.removeUser(user1));
        repo.insertUser(user1);
        assertEquals("0 expected, removal of user succeeds",0,repo.removeUser(user1));

        //Repeat test with different input
        assertFalse("False expected, user removed on setUp.", repo.getAllUsers().contains(user2));
        assertEquals("1 expected, removal of non-existant user",1,repo.removeUser(user2));
        repo.insertUser(user2);
        assertEquals("0 expected, removal of user succeeds",0,repo.removeUser(user2));
    }

    @Test
    public void testGetUserID(){

        //Asserting userID access gives back proper value.
        assertEquals("null expected, value doesn't exist.", null, repo.getUser(user1.getPhone_number()));
        repo.insertUser(user1);
        assertTrue("True expected, with equality evaluation.",
                repo.getUser(user1.getPhone_number()).getPhone_number().equals( user1.getPhone_number()) &&
                        repo.getUser(user1.getPhone_number()).getScreen_name().equals( user1.getScreen_name()));

        //Repeat test with different input
        assertEquals("null expected, value doesn't exist.", null, repo.getUser(user2.getPhone_number()));
        repo.insertUser(user2);
        assertTrue("True expected, with equality evaluation.",
                repo.getUser(user2.getPhone_number()).getPhone_number().equals( user2.getPhone_number()) &&
                        repo.getUser(user2.getPhone_number()).getScreen_name().equals( user2.getScreen_name()));

    }

    @Test
    public void testGetUsers(){
        //Assert getAllUsers reflects insertion changes.
        int orig_size = repo.getAllUsers().size();
        assertFalse(repo.getAllUsers().contains(user1));
        repo.insertUser(user1);
        assertTrue(repo.getUser(user1.getPhone_number()) != null);
        assertEquals(orig_size+1,repo.getAllUsers().size());

        //Repeat test with different input
        assertFalse(repo.getAllUsers().contains(user2));
        repo.insertUser(user2);
        assertTrue(repo.getUser(user2.getPhone_number()) != null);
        assertEquals(orig_size+2,repo.getAllUsers().size());
    }

    public static void main(String[] args) {
        JUnitCore.runClasses(JUnitCasesUser.class);
    }
}
