import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");

export const fetchDataRecent = () =>{
    const getAllPostUrl = baseURL + ":8080/posts/recentPosts";
    return fetch(getAllPostUrl).then(response => response.json());
};

export const fetchDataLiked = () =>{
    const getAllPostUrl = baseURL + ":8080/posts/mostLikedPosts";
    return fetch(getAllPostUrl).then(response => response.json());

};
