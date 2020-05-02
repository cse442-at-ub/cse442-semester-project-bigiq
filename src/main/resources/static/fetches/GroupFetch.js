import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const fetchUserGroups = (screenName) =>{
    const URL = baseURL + ":8080/groups/getusergroups?screenName=" + screenName;
    return fetch(URL).then(response => response.json());
};
export const fetchAllGroups = (screenName) =>{
    const URL = baseURL + ":8080/groups/getallgroups?screenname=" + screenName;
    return fetch(URL).then(response => response.json());
};

export const searchGroups = (keyword) =>{
    const URL = baseURL + ":8080/groups/searchGroup?keyword=" + keyword;
    return fetch(URL).then(response => response.json());
};

export const getAllUsers = (groupName, screenName) =>{
    const URL = baseURL + ":8080/groups/getallusers?screenname=" + screenName + "&group_name=" + groupName;
    return fetch(URL).then(response => response.json());
};

export const insertUser = (screenName, groupName) =>{
    const URL = baseURL + ":8080/groups/addUser?screenname=" + screenName + "&group_name=" + groupName;
    fetch(URL, {
        method: "POST"
    }).then(function(response) {
        if(response.ok){
            console.log(screenName + " added to " + groupName)
        }
    });
};

export const changeImage = (image, groupName) =>{
    const URL = baseURL + ":8080/groups/addUser?image=" + image + "&group_name=" + groupName;
    fetch(URL, {
        method: "POST"
    }).then(function(response) {
        if(response.ok){
            console.log(image + " change from " + groupName)
        }
    });
};

export const changeDesc = (groupName, groupDesc) =>{
    const URL = baseURL + ":8080/groups/changeDesc?desc=" + groupDesc + "&group_name=" + groupName;
    fetch(URL, {
        method: "POST"
    }).then(function(response) {
        if(response.ok){
            console.log(groupName + " changed desc")
        }
    });
};

export const insertGroup = (screenName, groupName, groupDesc, groupImage) =>{
    const URL = baseURL + ":8080/groups/insertGroup?screenname=" + screenName;
    fetch(URL, {
        method: "POST",
        body: JSON.stringify(
            {
                group_name: groupName,
                group_desc: groupDesc,
                image: groupImage
            }
         ),
        headers: new Headers({'content-type': 'application/json'}),
    }).then(function(response) {
        if(response.ok){
            console.log(groupName + " added")
        }
    });
};
