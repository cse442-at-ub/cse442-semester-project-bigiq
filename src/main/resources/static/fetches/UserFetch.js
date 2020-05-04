import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");

export const deleteUser = (phoneNumber, screenName) =>{
    const URL = baseURL + ":8080/users/removeuser?id=" + id;
    const payload = {
        phoneNumber: phoneNumber,
        screenName: screenName
    };
    return fetch(URL, {
        method: "DELETE",
        body: JSON.stringify( payload ),
        headers: new Headers({'content-type': 'application/json'}),
    });
};

export const changeName = (oldName,newName) =>{
    const URL = baseURL + ":8080/users/changename?old_screen="+ oldName + "&new_screen=" + newName;
    return fetch(URL,{
        method: "POST"
    }).then(response => response.json());
};
