package com.example.AnonMe.database;


import com.example.AnonMe.model.AudioEntry;
import com.example.AnonMe.model.PostEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository
public class AudioRepository {

    @Autowired
    JdbcTemplate jdbc;

    @Autowired
    PostRepository post_repo;


    public void insertPost(AudioEntry audioentry) {
        //Inserting Audio as post
        PostEntry tmp = new PostEntry(audioentry.getPost_id(), audioentry.getScreenName(), audioentry.getContent(),
                0, 0, audioentry.getTimestamp(), false, false);
        post_repo.insertPost(tmp);

        //Setting flag to distinguish Audio posts
        String sql = "UPDATE post_data " +
                "SET comment_delim = '2' " +
                "WHERE post_id = '" + tmp.getPost_id() + "'";
        jdbc.update(sql);

        //Storing excess variables to audio posts
        sql  =  "INSERT into audio_posts " +
                "(post_id, duration, value, play_button) " +
                "VALUES  ( ? , ? , 0 , false )";
        Object[] params = new Object[]{audioentry.getPost_id(), audioentry.getDuration()};
        int[] types = new int[]{Types.VARCHAR, Types.BIGINT};
        jdbc.update(sql,params,types);
    }

    public void removePost(AudioEntry audioentry){
        post_repo.removePostID(audioentry.getPost_id());
    }

    public List<AudioEntry> getPosts(String user, boolean recent_like_flag){
        List<AudioEntry> ret = getPosts(recent_like_flag);
        for (AudioEntry tmp : ret){
            tmp.setLike_button(post_repo.getLike(tmp.getPost_id(),user));
            tmp.setFlag_button(post_repo.getFlag(tmp.getPost_id(),user));
        }
        return ret;
    }

    public List<AudioEntry> getPosts(boolean recent_like_flag) {
        List<AudioEntry> ret = new ArrayList<>();

        String sql = "select a.post_id, b.screen_name,  a.content,  a.flag_ctr, a.like_ctr, a.timestamp_front as timestamp, " +
                "c.duration, c.value "+
                "from post_data a, user_info b, audio_posts c "+
                "where a.phone_number = b.phone_number " +
                "AND c.post_id = a.post_id "+
                "AND a.comment_delim = 2 " + (recent_like_flag ? "order by like_ctr DESC " : "order by a.timestamp DESC ");

        ret.addAll(jdbc.query(sql, BeanPropertyRowMapper.newInstance(AudioEntry.class)));
        return ret;
    }
}
