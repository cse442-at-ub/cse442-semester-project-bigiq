import {Platform} from "react-native";

const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
export const VoiceMostRecent = async (screenName) =>{
    const URL = baseURL + ":8080/audio/getAudioRecent?screenname=" + screenName;
    return fetch(URL).then(response => response.json());
};
export const VoiceMostLiked = async (screenName) =>{
    const URL = baseURL + ":8080/audio/getAudioLike?screenname=" + screenName;
    return fetch(URL).then(response => response.json());
};

export const likeVoice = (id,screenName) =>{
    const URL = baseURL + ":8080/audio/LikePost?id=" + id + "&screenName=" + screenName;
    return fetch(URL,{
        method: "POST"
    }).then(response => response.json());
};


