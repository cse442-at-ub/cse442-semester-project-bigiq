import {Platform} from "react-native";


const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const fetchPostDetails = (id) =>{
    const getPostById = baseURL + ":8080/posts/postById?id=" + id;
    return fetch(getPostById).then(response => response.json());

};
