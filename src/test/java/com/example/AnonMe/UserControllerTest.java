package com.example.AnonMe;
import com.google.gson.JsonObject;

import java.io.*;
import java.net.*;
import java.util.LinkedHashMap;
import java.util.Map;


public class UserControllerTest {
    public static void main(String[] args) {
        testAddUserBody();
    }
    public static void testAddUserBody(){
        try {
            JsonObject object = new JsonObject();
            object.addProperty("phoneNumber", "3470000000");
            object.addProperty("screenName", "asfidajnd");
            URL url = new URL("http://localhost:8080/users/adduser");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);
            OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
            wr.write(object.toString());
            wr.flush();

            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
            }
            assert (responseCode == 200);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void testAddUser(){
        try {
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("phoneNumber", "3470000000");
            params.put("screenName", "add");
            StringBuilder postData = new StringBuilder();
            for (Map.Entry<String, Object> param : params.entrySet()) {
                if (postData.length() != 0) postData.append('&');
                postData.append(URLEncoder.encode(param.getKey(), "UTF-8"));
                postData.append('=');
                postData.append(URLEncoder.encode(String.valueOf(param.getValue()), "UTF-8"));
            }
            byte[] postDataBytes = postData.toString().getBytes("UTF-8");
            URL url = new URL("http://localhost:8080/users/adduser");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setDoOutput(true);
            con.getOutputStream().write(postDataBytes);

            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK){
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
            }
            assert (responseCode == 200);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

