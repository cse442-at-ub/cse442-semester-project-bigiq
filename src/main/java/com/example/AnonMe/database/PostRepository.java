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
                "(post_id, phone_number, content, flag_ctr, like_ctr, timestamp, timestamp_front) " +
                "values  ( ? , ? , ? , ? , ? , NOW(), ? )";

        //Retrieving phone_number attributed to screen name.
        UserEntry tmp = repo.getUserScreen(post.getScreenName());
        if (tmp == null) return 1;
        String phone_number = tmp.getPhone_number();

        //Setting up Query
        Object[] params = new Object[]{post.getPost_id(), phone_number, post.getContent(), post.getFlag_ctr(), post.getLike_ctr(), post.getTimestampFront()};
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.VARCHAR};

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


    /* Accessors -- [Task #27] ------------------------------------------------------------
     * List getAllPosts() - returns all posts in DB
     * List getPostsRecent(int num) - returns num-th most recent posts.
     * List getPostsLiked(int num) - returns num-th most liked posts.
     * List getPostsPnum(string phone_number) - returns all posts from a user (by phone_number).
     * List getPostsAuth(string screen_name) - returns all posts from a user (by screen_name).
     * PostEntry getPostID(string PostID) - returns post matched by PostID.
     */

    /**
     * getAllPosts - returns all posts in DB
     * @return List of PostEntry of all posts in DB
     */
    public List<PostEntry> getAllPosts(){
        List<PostEntry> ret = new ArrayList<>();
        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number";
        ret.addAll(jdbc_temp.query(sql, BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getPostsRecent - returns all n-posts sorted by most recent
     * @param num number of posts to be returned from database.
     * @return List of PostEntry of all num-th most recent posts in DB.
     */
    public List<PostEntry> getPostsRecent(int num){
        List<PostEntry> ret = new ArrayList<>();
        if (num <= 0) return ret;

        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number "+
                "order by timestamp DESC limit " + num;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getPostsLiked - returns all n-posts sorted by most liked
     * @param num number of posts to be returned from database.
     * @return List of PostEntry of all num-th most liked posts in DB.
     */
    public List<PostEntry> getPostsLiked(int num){
        List<PostEntry> ret = new ArrayList<>();
        if (num <= 0) return ret;

        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number "+
                "order by like_ctr DESC limit " + num;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getPostsPnum - returns all posts associated to a user by phone number.
     * @param phone_number phone number of user to retrieve posts by.
     * @return List of PostEntry of all posts from a single user.
     */
    public List<PostEntry> getPostsPnum(String phone_number){
        List<PostEntry> ret = new ArrayList<>();

        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number AND a.phone_number = " + phone_number;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getPostsAuth - returns all posts associated to a user by screen name.
     * @param screen_name screen name of user to retrieve posts by.
     * @return List of PostEntry of all posts from a single user.
     */
    public List<PostEntry> getPostsAuth(String screen_name){
        List<PostEntry> ret = new ArrayList<>();

        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number AND b.screen_name = " + screen_name;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getPostID - returns the post associated to a post ID.
     * @param postID target postID
     * @return PostEntry associated to postID given, null if doesn't exist.
     */
    public PostEntry getPostID(String postID){
        List<PostEntry> ret = new ArrayList<>();


        String sql = "select a.post_id, b.screen_name, a.content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number AND a.post_id = " + postID;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        if (ret.size() == 0) return null;
        return ret.get(0);
    }
}