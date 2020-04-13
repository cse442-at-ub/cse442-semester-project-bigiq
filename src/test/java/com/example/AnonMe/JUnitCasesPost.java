package com.example.AnonMe;

import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.database.UserRepository;
import com.example.AnonMe.model.PostEntry;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.JUnitCore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.validation.constraints.AssertTrue;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class JUnitCasesPost extends TestCase {
    protected PostEntry post1, post2, post3;

    @Autowired
    protected UserRepository userrepo;

    @Autowired
    protected PostRepository postrepo;

    @Before
    public void setUp(){
        post1 = new PostEntry("1111111", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00", false, false);
        post2 = new PostEntry("2111112", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00", false, false);
        post3 = new PostEntry("3111113", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00", false, false);

    }

    @After
    public void tearDown(){
        postrepo.removePostID("1111111");
        postrepo.removePostID("2111112");
        postrepo.removePostID("3111113");
    }

    //#26
    @Test
    public void testInsertPost(){
        assertFalse(postrepo.getAllPosts(100).contains(post1));
        postrepo.insertPost(post1);
        assertTrue(postrepo.getPostID(post1.getPost_id()) != null);
        assertTrue(postrepo.insertPost(post1) == 1);
    }

    @Test
    public void testRemovePost(){
        postrepo.insertPost(post2);
        assertTrue(postrepo.getPostID(post2.getPost_id()) != null);
        postrepo.removePostID(post2.getPost_id());
        assertTrue(postrepo.getPostID(post2.getPost_id()) == null);
        assertTrue(postrepo.removePostID(post2.getPost_id()) == 0);
    }

    @Test
    public void testremovePostNum(){
        postrepo.insertPost(post3);
        assertTrue(postrepo.getPostID(post3.getPost_id()) != null);
        postrepo.removePost(userrepo.getUserScreen(post3.getScreenName()).getPhone_number());
        assertTrue(postrepo.getPostID(post3.getPost_id()) == null);
        assertTrue(postrepo.removePost(userrepo.getUserScreen(post3.getScreenName()).getPhone_number()) == 0);
    }

    //#32+33
    @Test
    public void testpostLike(){

    }

    @Test
    public void testpostFlag(){

    }

}
