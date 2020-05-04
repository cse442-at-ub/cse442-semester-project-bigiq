import {AsyncStorage, Platform} from "react-native";


const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");

export const insertComment = (postId, screenName, content) =>{
    const url = baseURL + ":8080/comments/insertComment";
    const payload = {
        post_id: postId,
        screen_name: screenName,
        content: content
    };
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: new Headers({'content-type': 'application/json'}),
    });
};

export const fetchComments = (id) =>{
    const URL = baseURL + ":8080/comments/getAllComments?postId=" + id;
    console.log("fetched Comments for: " + id );
    return fetch(URL).then(response => response.json());
};
