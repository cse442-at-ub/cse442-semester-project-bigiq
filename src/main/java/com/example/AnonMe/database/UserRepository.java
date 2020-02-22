package com.example.AnonMe.database;


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
import java.util.List;

@org.springframework.stereotype.Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbc_temp;

    public List<UserEntry> getAllUsers(){
        List<UserEntry> userList = new ArrayList<>();
        String sql = "select * from user_info";

        userList.addAll(jdbc_temp.query(sql,
                BeanPropertyRowMapper.newInstance(UserEntry.class)));

        return userList;
    }


    public int insertUser(UserEntry newEntry){
        String sql = "insert into user_info " +
                "(phone_number, screen_name) " +
                "values  ( ? , ? )";

        Object[] params = new Object[] {newEntry.getPhone_number(), newEntry.getScreen_name()};
        int[] types = new int[] { Types.VARCHAR, Types.VARCHAR};

        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex){
            System.out.println(0 + " row affected");
            return 0;
        }

        System.out.println(1 + " row affected");
        return 1;
    }

    public int removeUser(UserEntry newEntry){
        String sql = "DELETE FROM user_info WHERE " +
                "phone_number = ? ";

        Object[] params = new Object[] {newEntry.getPhone_number()};
        int[] types = new int[] {Types.VARCHAR};

        try {
            jdbc_temp.update(sql, params, types);
        } catch (DataAccessException ex){
            System.out.println(0 + " row affected");
            return 0;
        }
        
        System.out.println(1 + " row affected");
        return 1;
    }

}
