package com.example.AnonMe;
import com.example.AnonMe.database.CommentRepository;
import com.example.AnonMe.database.PostRepository;
import com.example.AnonMe.database.UserRepository;
import com.example.AnonMe.model.PostEntry;
import com.example.AnonMe.model.UserEntry;
import com.example.AnonMe.model.CommentEntry;
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
public class JUnitCasesComments extends TestCase{
    protected CommentEntry comment1, comment2, comment3;
    protected PostEntry post;

    @Autowired
    protected UserRepository userrepo;

    @Autowired
    protected PostRepository postrepo;

    @Autowired
    protected CommentRepository commentRepository;

    @Before
    public void setUp(){
        post = new PostEntry("11144411",userrepo.getAllUsers().get(0).getScreen_name(),"LOL Post", 0,0, "0000-00-00",false,false);

        comment1 = new CommentEntry("1111111", post.getPost_id(), "1", userrepo.getAllUsers().get(0).getScreen_name(), "0000-00-00", false, false);
        comment2 = new CommentEntry("2111112", post.getPost_id(), "1", userrepo.getAllUsers().get(0).getScreen_name(), "0000-00-00", false, false);
        comment3 = new CommentEntry("3111113", post.getPost_id(), "1", userrepo.getAllUsers().get(0).getScreen_name(),"0000-00-00", false, false);

    }

    @After
    public void tearDown(){
        postrepo.removePostID("1111111");
        postrepo.removePostID("2111112");
        postrepo.removePostID("3111113");
    }
}
