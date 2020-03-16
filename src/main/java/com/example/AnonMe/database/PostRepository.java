package com.example.AnonMe.database;

import com.example.AnonMe.model.PostEntry;
import com.example.AnonMe.model.UserEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@org.springframework.stereotype.Repository
public class PostRepository {

    @Autowired
    private JdbcTemplate jdbc_temp;
    private UserRepository repo;
    private final ArrayList<Character> InvalidChars = new ArrayList<>(Arrays.asList('\\', '\'', '%', '_', '"'));

    /* Modifiers -- [Task #26] ------------------------------------------------------------
     * void parseEscape(PostEntry) - Parses and handles escape character cases for content.
     * int insertPost(PostEntry) - Stores post entry into database.
     * int removePostID(postID) - Remove post entry from database, based on postID.
     * int removePostNum(phone_number) - Remove post entry from database, based on phone_number.
     * */


    /**
     * parseEscape - Parses content of post entry and escapes special chars before querying.
     *
     * @param post PostEntry to be parsed.
     */
    public void parseEscape(PostEntry post) {
        String content = post.getContent();
        String parsed = "";
        for (int i = 0; i < content.length(); i++) {
            if (InvalidChars.contains(content.charAt(i))) {
                parsed += '\\';
            }
            ;
            parsed += content.charAt(i);
        }
        post.setContent(parsed);
    }


    /**
     * insertPost - inserts new post entry into database
     *
     * @param post PostEntry to be inserted.
     * @return 0 if successful, 1 if failed
     */
    public int insertPost(PostEntry post) {
        String sql = "insert into post_data " +
                "(post_id, phone_number, content, flag_ctr, like_ctr, timestamp) " +
                "values  ( ? , ? , ? , ? , ? , ? )";

        //Retrieving phone_number attributed to screen name.
        UserEntry tmp = repo.getUserScreen(post.getAuthor());
        if (tmp == null) return 1;
        String phone_number = tmp.getPhone_number();

        //Setting up Query
        Object[] params = new Object[]{post.getPost_id(), phone_number, post.getContent(), post.getFlag_ctr(), post.getLike_ctr(), post.getTimestamp()};
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.TIMESTAMP};

        //Running Query
        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex) {
            System.out.println(0 + " row affected");
            return 1;
        }

        System.out.println(1 + " row affected");
        return 0;
    }

    /**
     * removePostID - removes post by postID
     *
     * @param postID Post ID linking to post to be deleted
     * @return 0 if successful, 1 if failed
     */
    public int removePostID(String postID) {
        String sql = "DELETE FROM post_data WHERE " +
                "post_id = ? ";

        Object[] params = new Object[]{postID};
        int[] types = new int[]{Types.VARCHAR};

        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex) {
            System.out.println(0 + " row affected");
            return 1;
        }

        System.out.println(1 + " row affected");
        return 0;
    }

    /**
     * removePost - removes all posts associated to a phone_number
     *
     * @param phone_number phone number of associated user posts to be deleted.
     * @return 0 if successful, 1 if failed.
     */
    public int removePost(String phone_number) {
        String sql = "DELETE FROM post_data WHERE " +
                "phone_number = ? ";

        Object[] params = new Object[]{phone_number};
        int[] types = new int[]{Types.VARCHAR};

        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex) {
            System.out.println(0 + " row affected");
            return 1;
        }

        System.out.println("Multiple rows affected");
        return 0;
    }
}