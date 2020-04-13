import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const fetchGroups = () =>{
    const URL = baseURL + ":8080/groups/getallgroups";
    return fetch(URL).then(response => response.json());
};
