import {RNS3} from "react-native-aws3/src/RNS3";

export const getS3 = (uri, groupName) =>{
    const file = {
        uri: uri,
        name: groupName + '.jpg',
        type: 'image/jpeg'
    };
    const option = {
        keyPrefix: 'GroupImage/',
        bucket: 'anonmebucket',
        region: 'us-east-2',
        accessKey: 'AKIATKMN22MYCP5X3E7K',
        secretKey: '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',
        successActionStatus: 201
    };
    RNS3.put(file, option).then(response =>{
        if(response.status !== 201){
            throw new Error('Failed to upload image ', response)
        }
        console.log(response.body)
    })
};
