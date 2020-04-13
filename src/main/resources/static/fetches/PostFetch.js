import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const fetchPostDetails = (id) =>{
    const URL = baseURL + ":8080/posts/postById?id=" + id;
    return fetch(URL).then(response => response.json());
};
export const fetchDataRecent = (screenName) =>{
    const URL = baseURL + ":8080/posts/recentPosts?screenName=" + screenName;
    return fetch(URL).then(response => response.json());
};
export const likePost = (id,screenName) =>{
    const URL = baseURL + ":8080/posts/LikePost?id=" + id + "&screenName=" + screenName;
    return fetch(URL,{
        method: "POST"
    }).then(response => response.json());
};
export const flagPost = (id,screenName) =>{
    const URL = baseURL + ":8080/posts/FlagPost?id=" + id + "&screenName=" + screenName;
    return fetch(URL,{
        method: "POST"
    }).then(response => response.json());
};
export const fetchDataLiked = (screenName) =>{
    const URL = baseURL + ":8080/posts/mostLikedPosts?screenName=" + screenName;
    return fetch(URL).then(response => response.json());
};
export const deletePost = (id) =>{
    const URL = baseURL + ":8080/posts/deletePostByID?id=" + id;
    return fetch(URL, {
        method: "DELETE",
    });
};
export const deleteAllPostAuth = (phoneNumber) =>{
    const URL = baseURL + ":8080/posts/deleteAllAuthorPosts?phoneNumber=" + phoneNumber;
    return fetch(URL, {
        method: "DELETE",
    });
};
export const postByAuthor = (screenName) =>{
    const URL = baseURL + ":8080/posts/postsByScreenName?screenName=" + screenName;
    return fetch(URL).then(response => response.json());
};
export const fetchInterest = (screenName) =>{
    const getAllPostUrl = baseURL + ":8080/posts/PostInterest?screenName=" + screenName;
    return fetch(getAllPostUrl).then(response => response.json());
};


