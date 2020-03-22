package com.example.AnonMe.service;

import java.util.HashMap;

public class TimeFormatter {
    private HashMap<Integer, String> months = new HashMap<>();

    public TimeFormatter(){
        setUpMap();
    }

    public void setUpMap(){
        for(int i = 1; i < 13; i++ ){
            switch (i){
                case 1:
                    months.put(i,"Jan");
                    break;
                case 2:
                    months.put(i,"Feb");
                    break;
                case 3:
                    months.put(i,"March");
                    break;
                case 4:
                    months.put(i,"April");
                    break;
                case 5:
                    months.put(i,"May");
                    break;
                case 6:
                    months.put(i,"June");
                    break;
                case 7:
                    months.put(i,"July");
                    break;
                case 8:
                    months.put(i,"Aug");
                    break;
                case 9:
                    months.put(i,"Sept");
                    break;
                case 10:
                    months.put(i,"Oct");
                    break;
                case 11:
                    months.put(i,"Nov");
                    break;
                case 12:
                    months.put(i,"Dec");
                    break;
            }
        }
    }
    public String format(String time){
        String month = months.get(Integer.parseInt(time.substring(5,7)));
        time = month + time.substring(7,time.length()-3);
        System.out.println(time);
        String hour = time.substring(9,11);
        if(Integer.parseInt(hour) > 12){
            int hourConvert = Integer.parseInt(hour) - 12;
            time = time.replaceFirst(hour, Integer.toString(hourConvert));
            if(hour.equals("24")) return time + " AM";
            return time + " PM";
        }
        if(hour.equals("12")) return time + " PM";
        return time + " AM";
    }
}
