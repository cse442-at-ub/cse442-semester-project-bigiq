import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const fetchGroups = (screenName) =>{
    const URL = baseURL + ":8080/groups/getallgroups?screenname=" + screenName;
    return fetch(URL).then(response => response.json());
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