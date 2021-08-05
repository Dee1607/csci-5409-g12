const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.uploadFiles = async function(data) {
    var files = data.images;
    var audio = data.audio;
    var username = data.userName;
    var promises = []
    files.forEach((file, index) => {
        promises.push(imageUpload(file, index))
    });
    promises.push(audioUpload(audio));
    return Promise.all(promises).then(response => {
        return response
    })
}

imageUpload = (file, index) => {
    const base64File = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = file.split(';')[0].split('/')[1]; 
    const params = {
        Bucket: 'input12',
        Key:"Deep" +"/"+`${index + 1}.${type}`,
        Body: base64File,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`,
    };

    console.log("Image" + index)
    return s3.putObject(params, (error, response) => {
        if (error) {
            return Promise.reject(error)
        } else if (response) {
            console.log("Call Back for image")
            return Promise.resolve(response)
        }
    }).promise();
}

audioUpload = (audio) => {
    const base64AudioFile = new Buffer.from(audio.replace(/^data:audio\/\w+;base64,/, ""), 'base64');
    const audioFileType = audio.split(';')[0].split('/')[1];
    
    const params = {
        Bucket: 'input12',
        Key:"Deep"+"/"+`audio.${audioFileType}`,
        Body: base64AudioFile,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `audio/${audioFileType}`,
    };

    console.log("Audio")

    return s3.putObject(params, (error, response) => {
        if (error) {
            return Promise.reject(error)
        } else if (response) {
            console.log("Call Back for audio")
            return Promise.resolve(response)
        }
    }).promise();
}