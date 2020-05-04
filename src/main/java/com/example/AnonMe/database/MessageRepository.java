package com.example.AnonMe.database;

import com.example.AnonMe.model.MessageEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Types;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

@org.springframework.stereotype.Repository
public class MessageRepository {

    @Autowired
    private JdbcTemplate jdbc_temp;


    public void insertMessage(MessageEntry messageEntry) {
        String sql = "INSERT INTO user_group_messages " +
                "(message_id, content, flag_ctr, like_ctr, " +
                "timestamp, timestamp_front, image, " +
                "video, duration, screen_name, group_name) " +
                "VALUES ( ? , ? , ? , ? , NOW(), ? , ? , ? , ? , ? , ? )";

        int[] types = {Types.VARCHAR,
                Types.VARCHAR, Types.INTEGER, Types.INTEGER,
                Types.VARCHAR, Types.VARCHAR,
                Types.VARCHAR, Types.INTEGER,
                Types.VARCHAR, Types.VARCHAR};

        Object[] args = {messageEntry.getMessageId(),
                messageEntry.getContent(),0,0,
                messageEntry.getTimestamp(), messageEntry.getImage(),
                messageEntry.getVideo(), messageEntry.getDuration(),
                messageEntry.getUser().getScreen_name(), messageEntry.getGroup_name()};

        jdbc_temp.update(sql,args,types);
    }

    public List<MessageEntry> getAllMessages(){
        String sql = "SELECT a.message_id ,a.content,a.timestamp_front as timestamp, a.image, a.video, a.duration, a.group_name, " +
                "b.screen_name, b.phone_number, c.image as group_icon  " +
                "FROM user_group_messages a, user_info b, group_data_table c " +
                "WHERE a.screen_name = b.screen_name AND c.group_name = a.group_name ORDER BY a.group_name, a.timestamp ASC ";

        List<MessageEntry> ret = new ArrayList<>();
        ret.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper<>(MessageEntry.class)));
        return ret;
    }


    public List<MessageEntry> getMessages(String screenname, String groupname) {
        String sql = "SELECT a.message_id ,a.content,a.timestamp_front as timestamp, a.image, a.video, a.duration, a.group_name, " +
                "(b.screen_name = '"+screenname+"') as authored, " +
                "b.screen_name, b.phone_number " +
                "FROM user_group_messages a, user_info b " +
                "WHERE a.screen_name = b.screen_name " +
                "AND a.group_name = '"+groupname+"' ORDER BY a.timestamp ASC";

        List<MessageEntry> ret = new ArrayList<>();
        ret.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper<>(MessageEntry.class)));
        return ret;
    }

    public List<MessageEntry> lastMessages(String screenname) {
        String sql = "SELECT * FROM (SELECT a.message_id ,a.content,a.timestamp_front as timestamp, a.image, a.video, a.duration, a.group_name, " +
                "(b.screen_name = '"+screenname+"') as authored, " +
                "b.screen_name, b.phone_number, e.image as group_icon " +
                "FROM user_group_messages a, user_info b, group_data_table e " +
                "WHERE a.screen_name = b.screen_name " +
                "AND e.group_name = a.group_name " +
                "AND EXISTS ( " +
                "   SELECT * FROM group_data_table c, user_group_data d " +
                "   WHERE a.group_name = c.group_name " +
                "AND c.group_id = d.group_id " +
                "AND d.screen_name = '"+screenname+"' " +
                ") ORDER BY a.group_name, a.timestamp DESC) AS x GROUP BY group_name ";

        List<MessageEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper<>(MessageEntry.class)));

        return tmp;
    }

    public void remove(MessageEntry message1) {
        String sql = "REMOVE FROM user_group_messages WHERE message_id ='"+message1.getMessageId()+"'";
        jdbc_temp.update(sql);
    }

    /*public MessageEntry lastMessage(String screenname, String groupname) {
        List<MessageEntry> ret = getMessages(screenname,groupname);
        return ret.get(ret.size()-1);
    }*/
}
