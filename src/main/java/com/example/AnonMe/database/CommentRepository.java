package com.example.AnonMe.database;
import com.example.AnonMe.model.CommentEntry;
import com.example.AnonMe.model.PostEntry;
import com.example.AnonMe.model.UserEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;


@org.springframework.stereotype.Repository
public class CommentRepository {
    @Autowired
    private JdbcTemplate jdbc_temp;
    @Autowired
    private UserRepository user_repo;
    @Autowired
    private PostRepository post_repo;

    /* Task # 2
     * Storing comment-data into the database.
     * Accessing comment-data from database.
     * */

    // Inserts new CommentEntry into DB
    public void insertComment(CommentEntry entry){
        //Inserting comment as post
        PostEntry tmp = new PostEntry(entry.getComment_id(), entry.getScreen_name(), entry.getContent(),
                0, 0, entry.getTimestamp_front());
        post_repo.insertPost(tmp);

        //Setting flag to distinguish between post + comments
        String sql = "UPDATE post_data " +
                "SET comment_delim = '1' " +
                "WHERE post_id = '" + entry.getComment_id() + "'";
        jdbc_temp.update(sql);

        //creating correlation between post_id and comment_id
        sql  =  "INSERT into user_comment " +
                "(post_id, comment_id, phone_number) " +
                "VALUES  ( ? , ? , ? )";
        Object[] params = new Object[]{entry.getPost_id(), entry.getComment_id(), user_repo.getUserScreen(entry.getScreen_name()).getPhone_number()};
        int[] types = new int[]{Types.VARCHAR,Types.VARCHAR,Types.VARCHAR};
        jdbc_temp.update(sql,params,types);
    }

    //Retrieves all comments based off post id
    public List<CommentEntry> getPostComments(String post_id){
        List<CommentEntry> ret = new ArrayList<>();
        String sql = "SELECT a.comment_id, a.post_id, c.screen_name, b.content, b.timestamp_front " +
                "FROM user_comment a, post_data b, user_info c " +
                "WHERE a.post_id = '" + post_id + "' " +
                "AND a.comment_id = b.post_id " +
                "AND b.phone_number = c.phone_number ";

        ret.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(CommentEntry.class)));

        return ret;
    }

}
