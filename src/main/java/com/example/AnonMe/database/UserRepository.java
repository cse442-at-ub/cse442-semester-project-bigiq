package com.example.AnonMe.database;


import com.example.AnonMe.model.UserEntry;
import com.fasterxml.jackson.databind.BeanProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.support.SQLExceptionTranslator;

import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@org.springframework.stereotype.Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbc_temp;

    /* ==========================================
    * VerifyName(String screenName)
    * Verifies validity of a new screenName
    * Checks for and returns flags:
    *       0 -- Valid screenName, no issues found.
    *       1 -- screenName already used by user.
    *       2 -- screenName contains invalid characters.
    *       3 -- screenName exceeds 16 characters.
    * =========================================*/
    public int verifyName(String screenName){
        int flag_ret = 3;
        final ArrayList<Character> InvalidChars = new ArrayList<>(Arrays.asList('/','\\','\'','?','!','@','='));


        //3 -- Checking for screenName length
        if (screenName.length() > 16) return flag_ret;
        flag_ret--; //Test passed

        //2 -- Checking for invalid chars
        for (int i = 0; i < screenName.length(); i++){
            if (InvalidChars.contains(screenName.charAt(i))) return flag_ret;
        } flag_ret--; //Test passed

        //1 -- Checking for uniqueness
        List<UserEntry> ret = new ArrayList<>();
        String sql = "select * from user_info user_ where user_.screen_name = '" + screenName + "'";
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(UserEntry.class)));
        if (ret.size() == 0) flag_ret--; //Test passed

        return flag_ret;
    }

    /* ==========================================
     * insertUser(UserEntry newEntry)
     * Inserts a new user into the database, with phone_number being the PK
     *
     * Returns 1 if unsuccessful
     *         0 if successful
     * =========================================*/
    public int insertUser(UserEntry newEntry){
        String sql = "insert into user_info " +
                "(phone_number, screen_name) " +
                "values  ( ? , ? )";

        Object[] params = new Object[] {newEntry.getPhone_number(), newEntry.getScreen_name()};
        int[] types = new int[] { Types.VARCHAR, Types.VARCHAR};

        try {
            int i = jdbc_temp.update(sql, params, types);
            if (i == 0) return 1;
        } catch (DataAccessException ex){
            System.out.println(0 + " row affected");
            return 1;
        }

        System.out.println(1 + " row affected");
        return 0;
    }

    /* ==========================================
     * removeUser(UserEntry newEntry)
     * Removes a user from the database
     *
     * Returns 1 if unsuccessful
     *         0 if successful
     * =========================================*/
    public int removeUser(UserEntry newEntry){
        String sql = "DELETE FROM user_info WHERE " +
                "phone_number = ? ";

        Object[] params = new Object[] {newEntry.getPhone_number()};
        int[] types = new int[] {Types.VARCHAR};

        try {
            int i = jdbc_temp.update(sql, params, types);
            if (i == 0) return 1;
        } catch (DataAccessException ex){
            System.out.println(0 + " row affected");
            return 1;
        }
        
        System.out.println(1 + " row affected");
        return 0;
    }

    /*
    * getUser(String phone_number)
    *
    * Returns a UserEntry with the data associated with phone_number.
    *         null if User does not exist.
    */
    public UserEntry getUser(String phone_number){
        String sql = "SELECT * FROM user_info WHERE phone_number = '" + phone_number + "'";

        List<UserEntry> access = new ArrayList<>();
        access.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(UserEntry.class)));

        if (access.size() == 0) return new UserEntry();
        else return access.get(0);
    }

    /*
     * getUserScreen(String screen_name)
     *
     * Returns a UserEntry with the data associated with screen_name.
     *       null if User does not exist.
     */
    public UserEntry getUserScreen(String screen_name){
        List<UserEntry> ret = new ArrayList<>();
        String sql = "select * from user_info where screen_name = '" + screen_name + "'";
        ret.addAll(jdbc_temp.query(sql,BeanPropertyRowMapper.newInstance(UserEntry.class)));
        if (ret.size() == 0) return new UserEntry();
        else return ret.get(0);
    }

    /*
     * =========================================
     * getAllUsers()
     * returns a list of UserEntry objects for all users in the current DB.
     * */
    public List<UserEntry> getAllUsers(){
        List<UserEntry> userList = new ArrayList<>();
        String sql = "select * from user_info";

        userList.addAll(jdbc_temp.query(sql,
                BeanPropertyRowMapper.newInstance(UserEntry.class)));

        return userList;
    }

    /*
     * =========================================
     * changeName(String old_screen, String new_screen)
     * returns a list of UserEntry objects for all users in the current DB.
     * */
    public void changeName(String old_screen, String new_screen){
        String sql = "Update user_info " +
                "Set screen_name = '" + new_screen + "' " +
                "Where screen_name = '" + old_screen +"' ";

        jdbc_temp.update(sql);
    }
}
