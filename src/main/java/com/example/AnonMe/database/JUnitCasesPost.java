package com.example.AnonMe.database;

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
        post1 = new PostEntry("1111111", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00");
        post2 = new PostEntry("2111112", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00");
        post3 = new PostEntry("3111113", userrepo.getAllUsers().get(0).getScreen_name(), "1",0,0,"0000-00-00");

    }

    @After
    public void tearDown(){
        postrepo.removePostID("1111111");
        postrepo.removePostID("2111112");
        postrepo.removePostID("3111113");
    }

    /*
     *
     */
}
