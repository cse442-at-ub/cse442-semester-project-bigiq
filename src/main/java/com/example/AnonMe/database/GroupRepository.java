package com.example.AnonMe.database;
import com.example.AnonMe.model.CommentEntry;
import com.example.AnonMe.model.GroupEntry;
import com.example.AnonMe.model.PostEntry;
import com.example.AnonMe.model.UserEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.beans.BeanProperty;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;


@org.springframework.stereotype.Repository
public class GroupRepository {

    @Autowired
    private JdbcTemplate jdbc_temp;
    @Autowired
    private UserRepository user_repo;
    @Autowired
    private PostRepository post_repo;

    /*---[Task #47] Access and Modify Group-data in DB---*/
    //Method to verify group name is valid
    public boolean VerifyGroupName (String group_name){
        String sql = "Select * from group_data_table where group_name = '" + group_name + "' ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper(GroupEntry.class)));

        return group_name.length() <= 16 && tmp.size() == 0;
    }

    //Method to add group to DB
    public void AddGroupToDB (GroupEntry groupentry, String screenname){
        String testUserSQL = "Select * from user_info where screen_name = '"+screenname+"' ";

        List<UserEntry> t = new ArrayList<>();
        t.addAll(jdbc_temp.query(testUserSQL, new BeanPropertyRowMapper<>(UserEntry.class)));
        if (t.size() == 0) return;

        String sql = "Insert into group_data_table " +
                "(group_id, group_name, group_desc, memberCount, image) " +
                "values ( ? , ? , ? , ? , ? ) ";
        Object[] params = {groupentry.getGroup_id(), groupentry.getGroup_name(), groupentry.getGroup_desc(),
        groupentry.getmemberCount(), groupentry.getImage()};
        int[] types = {Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.INTEGER, Types.VARCHAR};

        if (VerifyGroupName(groupentry.getGroup_name())) {
            jdbc_temp.update(sql,params,types);
            AddUserToGroup(screenname,groupentry.getGroup_name(), '1');
        }
        else System.out.println("Error: Group Name Invalid.");
    }

    //Method to add a user to a group
    public void AddUserToGroup(String screenname, String group_name, char role){
        //retrieving group_name entry
        String sql = "Select * from group_data_table where group_name = '" + group_name + "' ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper(GroupEntry.class)));

        //add user to group
        sql = "INSERT into user_group_data " +
                "(group_id, screen_name, role_flag) VALUES " +
                "( ? , ? , ? ) ";
        Object[] params = {tmp.get(0).getGroup_id(), screenname, role};
        int[] types = {Types.VARCHAR, Types.VARCHAR, Types.CHAR};
        jdbc_temp.update(sql,params,types);

        //update member count
        sql = "UPDATE group_data_table " +
                "SET `memberCount` = " + (tmp.get(0).getmemberCount()+1) + " " +
                "WHERE group_id = '" + tmp.get(0).getGroup_id() + "'";
        jdbc_temp.update(sql);
    }

    //Method to get the groups of a user
    public List<GroupEntry> getUserGroups(String screenname){
        String sql = "Select a.group_id, a.group_name, a.group_desc, a.memberCount, a.image from " +
                "group_data_table a, user_group_data b " +
                "where a.group_id = b.group_id AND b.screen_name = '" + screenname +"'";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));
        return tmp;
    }

    //Method to get all available groups
    public List<GroupEntry> getAllGroups (){
        String sql = "Select * from group_data_table";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));

        return tmp;
    }

    //Get all groups from database
    public List<GroupEntry> getAllGroups (String screenName){
        String sql = "Select * from group_data_table";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));

        for (GroupEntry a : tmp){
            a.setButton(checkMembership(screenName,a.getGroup_name()));
        }
        return tmp;
    }

    //Checks membership for user with each group available.
    public boolean checkMembership(String screenName, String groupName){
        String sql = "Select a.group_id, a.group_name, a.group_desc from " +
                "group_data_table a, user_group_data b " +
                "where a.group_id = b.group_id " +
                "AND b.screen_name = '" + screenName +"' " +
                "AND a.group_name = '" + groupName + "' ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));
        return tmp.size() == 1;
    }

    //Method to remove a user from a group
    public void RemoveUserFromGroup(String screenname, String group_name) {
        String sql = "Select * from group_data_table where group_name = '" + group_name + "' ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper(GroupEntry.class)));
        
        sql = "DELETE FROM user_group_data WHERE " +
                "group_id = ? AND screen_name = ?";

        Object[] params = new Object[]{tmp.get(0).getGroup_id(), screenname};
        int[] types = new int[]{Types.VARCHAR, Types.VARCHAR};
        jdbc_temp.update(sql,params,types);

        //update member count
        sql = "UPDATE group_data_table " +
                "SET `memberCount` = " + (tmp.get(0).getmemberCount()-1) + " " +
                "WHERE group_id = '" + tmp.get(0).getGroup_id() + "'";
        jdbc_temp.update(sql);
    }

    public void removeGroup(GroupEntry target){
        String sql = "DELETE FROM user_group_data " +
                "WHERE group_id = '" + target.getGroup_id() + "' ";
        jdbc_temp.update(sql);

        sql = "DELETE FROM user_group_messages WHERE " +
                "group_name = '" + target.getGroup_name() + "' ";

        jdbc_temp.update(sql);

        sql = "DELETE FROM group_data_table WHERE " +
                "group_id = '" + target.getGroup_id() + "' ";
        jdbc_temp.update(sql);


    }

    //Method to search for a group by keyword
    public List<GroupEntry> SearchForGroup(String keyword){
        String sql = "SELECT group_id, group_name, group_desc, memberCount, image FROM group_data_table " +
        "WHERE group_desc LIKE '%" + keyword + "%' ";
        List<GroupEntry> ret = new ArrayList<>();
        ret.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper<>(GroupEntry.class)));
        return ret;
    }


    public List<String> getAllUsers(String group_name, String screenname) {
        String sql = "Select * from group_data_table where group_name = '" + group_name + "' ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper(GroupEntry.class)));
        if (tmp.size() == 0) return new ArrayList<String>();

        sql = "SELECT screen_name from user_group_data "+
                "WHERE group_id = '" + tmp.get(0).getGroup_id() +"' " +
                "AND NOT screen_name = '"+ screenname +"' ";
        List<String> ret = new ArrayList<>();
        ret.addAll(jdbc_temp.queryForList(sql,String.class));

        return ret;
    }

    public void modifyGroup(String group_name, String change, String flag) {
        String group_id = "";

        String sql = "UPDATE ";
        if (flag == "owner") {
            List<GroupEntry> tmp = new ArrayList<>();
            tmp.addAll(jdbc_temp.query("Select * from group_data_table where group_name = '" + group_name + "' ",new BeanPropertyRowMapper(GroupEntry.class)));
            group_id = tmp.get(0).getGroup_id();

            sql += "user_group_data SET ";
            jdbc_temp.update("UPDATE user_group_data SET role_flag = 0 WHERE role_flag = 1 AND group_id = '" + group_id +"'");
        }
        else sql += "group_data_table SET ";

        switch (flag){
            case "image":
                sql += "image = ";
                break;
            case "desc":
                sql += "group_desc = ";
                break;
            case "name":
                sql += "group_name = ";
                break;
            case "owner":
                sql += "role_flag = 1 WHERE screen_name = ";
                break;
        }

        sql += "'"+ change +"' " + (flag == "owner" ? ("AND group_id = '"+ group_id+"'"):("WHERE group_name = '"+ group_name+ "'"));
        jdbc_temp.update(sql);
    }

    public List<GroupEntry> getuserowned(String screenname) {
        String sql = "SELECT a.group_id, a.group_name, a.group_desc, a.memberCount, a.image " +
                "FROM group_data_table a, user_group_data b " +
                "WHERE a.group_id = b.group_id " +
                "AND b.screen_name = '"+screenname+"' " +
                "AND b.role_flag = 1 ";

        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql,new BeanPropertyRowMapper<>(GroupEntry.class)));

        for (GroupEntry t:tmp){
            t.setButton(true);
        }

        return tmp;
    }

    public boolean verifyOwner(String screenname, String group_name) {
        String sql = "Select a.group_id, a.group_name, a.group_desc from " +
                "group_data_table a, user_group_data b " +
                "where a.group_id = b.group_id " +
                "AND b.screen_name = '" + screenname +"' " +
                "AND a.group_name = '" + group_name + "' " +
                "AND b.role_flag = 1 ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));
        return tmp.size() == 1;
    }

    public List<GroupEntry> getTrending(String screenname){
        String sql = "Select a.group_id, a.group_name, a.group_desc, a.memberCount, a.group_desc, a.image " +
                "from group_data_table a " +
                "WHERE NOT EXISTS ( " +
                "Select b.group_id from user_group_data b " +
                "WHERE b.group_id = a.group_id " +
                "AND b.screen_name = '"+screenname+"' " +
                ") ";
        List<GroupEntry> tmp = new ArrayList<>();
        tmp.addAll(jdbc_temp.query(sql, new BeanPropertyRowMapper(GroupEntry.class)));

        return tmp;
    }
}
