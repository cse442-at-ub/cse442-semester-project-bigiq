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
import java.util.Map;

@org.springframework.stereotype.Repository
public class PostRepository {

    @Autowired
    private JdbcTemplate jdbc_temp;
    @Autowired
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
        System.out.println(post.getScreenName());
        UserEntry tmp = repo.getUserScreen(post.getScreenName());
        if (tmp.equals(null)) return 1;
        String phone_number = tmp.getPhone_number();
        System.out.println(phone_number);

        //Setting up Query
        Object[] params = new Object[]{post.getPost_id(), phone_number, post.getContent(), post.getFlag_ctr(), post.getLike_ctr(), post.getTimestampFront()};
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.INTEGER, Types.VARCHAR};

        //Running Query
        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex) {
            ex.printStackTrace();
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
     * @param lim - limit on number of chars of content
     * @return List of PostEntry of all posts in DB
     */
    public List<PostEntry> getAllPosts(int lim){
        List<PostEntry> ret = new ArrayList<>();
        String sql = "select a.post_id, b.screen_name, SUBSTRING(a.content, 1, "+ lim + ") as content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b " +
                "where a.phone_number = b.phone_number "+
                "AND a.comment_delim = 0 " ;
        ret.addAll(jdbc_temp.query(sql, BeanPropertyRowMapper.newInstance(PostEntry.class)));

        return ret;
    }

    /**
     * getAllPosts - returns all posts.
     * @param lim - limit number of chars for content
     * @param user - username of current session pulling
     * @return
     */
    public List<PostEntry> getAllPosts(int lim, String user){
        List<PostEntry> ret = new ArrayList<>();
        String sql = "select a.post_id, b.screen_name, SUBSTRING(a.content, 1, "+ lim + ") as content, a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number "+
                "AND a.comment_delim = 0 ";
        ret.addAll(jdbc_temp.query(sql, BeanPropertyRowMapper.newInstance(PostEntry.class)));

        for (PostEntry tmp : ret) {
            tmp.setLike_button(getLike(tmp.getPost_id(),user));
            tmp.setFlag_button(getFlag(tmp.getPost_id(),user));
        }
        return ret;
    }

    /**
     * getPostsRecent - returns all n-posts sorted by most recent
     * @param num number of posts to be returned from database.
     * @param lim - limit on number of chars of content
     * @return List of PostEntry of all num-th most recent posts in DB.
     */
    public List<PostEntry> getPostsRecent(int num, int lim, String user){
        List<PostEntry> ret = new ArrayList<>();
        if (num <= 0) return ret;

        String sql = "select a.post_id, b.screen_name,  SUBSTRING(a.content, 1, "+ lim + ") as content,  a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number "+
                "AND a.comment_delim = 0 " +
                "order by timestamp DESC limit " + num;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        for (PostEntry tmp : ret) {
            tmp.setLike_button(getLike(tmp.getPost_id(),user));
            tmp.setFlag_button(getFlag(tmp.getPost_id(),user));
        }
        return ret;
    }

    /**
     * getPostsLiked - returns all n-posts sorted by most liked
     * @param num number of posts to be returned from database.
     * @param lim - limit on number of chars of content
     * @return List of PostEntry of all num-th most liked posts in DB.
     */
    public List<PostEntry> getPostsLiked(int num, int lim, String user){
        List<PostEntry> ret = new ArrayList<>();
        if (num <= 0) return ret;

        String sql = "select a.post_id, b.screen_name,  SUBSTRING(a.content, 1, "+ lim + ") as content,  a.flag_ctr, a.like_ctr, a.timestamp_front "+
                "from post_data a, user_info b "+
                "where a.phone_number = b.phone_number "+
                "AND a.comment_delim = 0 " +
                "order by like_ctr DESC limit " + num;
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        for (PostEntry tmp : ret) {
            tmp.setLike_button(getLike(tmp.getPost_id(),user));
            tmp.setFlag_button(getFlag(tmp.getPost_id(),user));
        }
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
                "where a.phone_number = b.phone_number " +
                "AND a.comment_delim = 0 " +
                "AND a.phone_number = '" + phone_number + "'";
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
                "where a.phone_number = b.phone_number " +
                "AND a.comment_delim = 0 " +
                "AND b.screen_name = '" + screen_name + "'";
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
                "where a.phone_number = b.phone_number " +
                "AND a.comment_delim = 0 " +
                "AND a.post_id = '"  + postID + "'";
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        if (ret.size() == 0) return null;
        return ret.get(0);
    }

    /* Post like and flag counter interaction [Task #32]
     * bool postLike - toggles like, changes like counter, returns bool of current button state
     * bool postFlag - toggles flag, changes flag counter, returns bool of current button state
     */
    /**
     * postLike - changes the DB in according to Like-Press by User
     * @param postId target postID
     * @param screen_name screen name of user changing post
     * @return boolean indicating current state of button (false = off, true = on)
     */
    public boolean postLike(String postId, String screen_name){
        //Pulling from interactions table
        boolean change = false;
        String sql = "SELECT a.phone_number, a.post_id, a.like " +
                "FROM user_flag_like a, user_info b " +
                "WHERE a.phone_number = b.phone_number " +
                "AND b.screen_name = '" + screen_name + "' " +
                "AND a.post_id = '" + postId + "'";

        List<Map<String, Object>> interaction = jdbc_temp.queryForList(sql);

        /*
        INTERACTION CASES
         */
        //First time interaction
        if (interaction.size() == 0){
            System.out.println("No previous interaction, inserting into records");
            change = true;

            sql = "insert into user_flag_like (phone_number, post_id, `like`, flag) " +
                    "values ( ? , ? , ? , ? )";

            UserEntry tmp = repo.getUserScreen(screen_name);
            String phone_number = tmp.getPhone_number();

            Object[] params = {phone_number,postId,"1","0"};
            int[] types = {Types.VARCHAR,Types.VARCHAR,Types.CHAR,Types.CHAR};

            try {
                jdbc_temp.update(sql, params, types);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }

        //Previously liked
        else if (interaction.get(0).get("like").equals("1")) {
            System.out.println("Now removing like");
            change = false;

            sql = "UPDATE user_flag_like " +
                    "SET `like` = '0' " +
                    "WHERE phone_number = '" + interaction.get(0).get("phone_number") + "' AND " +
                    "post_id = '" + interaction.get(0).get("post_id") + "'";

            try {
                jdbc_temp.update(sql);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }

        //Previously unliked
        else {
            System.out.println("Now liking");
            change = true;

            sql = "UPDATE user_flag_like " +
                    "SET `like` = '1' " +
                    "WHERE phone_number = '" + interaction.get(0).get("phone_number") + "' AND " +
                    "post_id = '" + interaction.get(0).get("post_id") + "'";

            try {
                jdbc_temp.update(sql);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }

        /*
        CHANGING COUNT OF LIKES FOR POST
         */
        if (change){
            sql = "UPDATE post_data " +
                    "SET like_ctr =  like_ctr + 1 " +
                    "WHERE post_id = '" + postId + "'";
        }
        else{
            sql = "UPDATE post_data " +
                    "SET like_ctr =  like_ctr - 1 " +
                    "WHERE post_id = '" + postId + "'";
        }
        try {
            jdbc_temp.update(sql);
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return false;
        }


        /*
        RETURNING CURRENT STATE OF BUTTON.
         */
        return change;
    }

    /**
     * postFlag - changes the DB in according to Flag-Press by User
     * @param postId target postID
     * @param screen_name screen name of user changing post
     * @return boolean indicating current state of button (false = off, true = on)
     */
    public boolean postFlag(String postId, String screen_name){
//Pulling from interactions table
        boolean change = false;
        String sql = "SELECT a.phone_number, a.post_id, a.flag " +
                "FROM user_flag_like a, user_info b " +
                "WHERE a.phone_number = b.phone_number AND " +
                "b.screen_name = '" + screen_name + "' AND " +
                "a.post_id = '" + postId + "'";

        List<Map<String, Object>> interaction = jdbc_temp.queryForList(sql);

        /*
        INTERACTION CASES
         */
        if (interaction.size() == 0){
            System.out.println("No previous interaction, inserting into records");
            change = true;

            sql = "insert into user_flag_like (phone_number, post_id, `like`, flag) " +
                    "values ( ? , ? , ? , ? )";

            UserEntry tmp = repo.getUserScreen(screen_name);
            String phone_number = tmp.getPhone_number();

            Object[] params = {phone_number,postId,"0","1"};
            int[] types = {Types.VARCHAR,Types.VARCHAR,Types.CHAR,Types.CHAR};

            try {
                jdbc_temp.update(sql, params, types);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }
        else if (interaction.get(0).get("flag").equals("1")){
            System.out.println("Now removing flag");
            change = false;

            sql = "UPDATE user_flag_like " +
                    "SET flag = '0' " +
                    "WHERE phone_number = '" + interaction.get(0).get("phone_number") + "' AND " +
                    "post_id = '" + interaction.get(0).get("post_id") + "'";

            try {
                jdbc_temp.update(sql);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }
        else {
            System.out.println("Now flagging");
            change = true;

            sql = "UPDATE user_flag_like " +
                    "SET flag = '1' " +
                    "WHERE phone_number = '" + interaction.get(0).get("phone_number") + "' AND " +
                    "post_id = '" + interaction.get(0).get("post_id") + "'";

            try {
                jdbc_temp.update(sql);
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }

        /*
        UPDATE FLAG COUNTER
         */
        if (change){
            sql = "UPDATE post_data " +
                    "SET flag_ctr =  flag_ctr + 1 " +
                    "WHERE post_id = '" + postId + "'";
        }
        else{
            sql = "UPDATE post_data " +
                    "SET flag_ctr =  flag_ctr - 1 " +
                    "WHERE post_id = '" + postId + "'";
        }
        try {
            jdbc_temp.update(sql);
        } catch (DataAccessException ex) {
            ex.printStackTrace();
            return false;
        }

        return change;
    }

    /*
     * Post's like/flag button state retrieval. [Task #33]
     * bool getLike (postId,screen_name) - returns on/off state of like-button
     * bool getFlag (postId,screen_name) - returns on/off state of flag-button
     */
    /**
     * getLike - returns current state of like-button
     * @param postId target postID
     * @param screen_name screen name of user changing post
     * @return boolean indicating current state (false = off, true = on)
     */
    public boolean getLike(String postId, String screen_name){
        String sql = "SELECT a.phone_number, a.post_id, a.like " +
                "FROM user_flag_like a, user_info b " +
                "WHERE a.phone_number = b.phone_number " +
                "AND b.screen_name = '" + screen_name + "' " +
                "AND a.post_id = '" + postId + "'";

        List<Map<String, Object>> interaction = jdbc_temp.queryForList(sql);
        if (interaction.size() == 0) return false;
        else{
            return interaction.get(0).get("like").equals("1");
        }
    }

    /**
     * getFlag - returns current state of flag-button
     * @param postId target postID
     * @param screen_name screen name of user changing post
     * @return boolean indicating current state (false = off, true = on)
     */
    public boolean getFlag(String postId, String screen_name){
        String sql = "SELECT a.phone_number, a.post_id, a.flag " +
                "FROM user_flag_like a, user_info b " +
                "WHERE a.phone_number = b.phone_number " +
                "AND b.screen_name = '" + screen_name + "' " +
                "AND a.post_id = '" + postId + "'";

        List<Map<String, Object>> interaction = jdbc_temp.queryForList(sql);
        if (interaction.size() == 0) return false;
        else{
            return interaction.get(0).get("flag").equals("1");
        }
    }

    /*
     * Retrieving posts of interest [Task #6]
     * List<PostEntry> postInterest(screen_name) - returns posts liked/posted by user
     */

    /**
     * postInterest - returns posts of interests for a user
     * @param screen_name - screen name of user targeted
     * @return list of post entry that have been liked/posted by a user.
     */
    public List<PostEntry> postInterest(String screen_name){
        //retrieving posts by screen_name
        List<PostEntry> ret = getPostsAuth(screen_name);

        //retrieving and appending posts liked by screen_name
        String phone_number = repo.getUserScreen(screen_name).getPhone_number();

        String sql = "SELECT b.post_id, c.screen_name, b.content, b.flag_ctr, b.like_ctr, b.timestamp_front " +
                "FROM user_flag_like a, post_data b, user_info c " +
                "WHERE b.post_id = a.post_id " +
                "AND b.phone_number = c.phone_number " +
                "AND a.like = '1' " +
                "AND a.phone_number = '" + phone_number +"'";

        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        for (PostEntry tmp : ret) {
            tmp.setLike_button(getLike(tmp.getPost_id(),screen_name));
            tmp.setFlag_button(getFlag(tmp.getPost_id(),screen_name));
        }
        return ret;
    }

    /**
     * getPostsLikedBy - returns posts liked by a user
     * @param screenName - screen name of user targeted
     * @return list of
     */
    public List<PostEntry> getPostsLikedBy(String screenName) {
        List<PostEntry> ret = new ArrayList<>();

        String phone_number = repo.getUserScreen(screenName).getPhone_number();
        String sql = "SELECT b.post_id, c.screen_name, b.content, b.flag_ctr, b.like_ctr, b.timestamp_front " +
                "FROM user_flag_like a, post_data b, user_info c " +
                "WHERE b.post_id = a.post_id AND b.phone_number = c.phone_number AND a.like = '1' AND a.phone_number = '" + phone_number +"'";

        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(PostEntry.class)));

        for (PostEntry tmp : ret) {
            tmp.setLike_button(getLike(tmp.getPost_id(),screenName));
            tmp.setFlag_button(getFlag(tmp.getPost_id(),screenName));
        }

        return ret;
    }
}