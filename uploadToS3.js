const path = './fiels/'
const fs = require('fs');
// const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const uploadFiles = async () => {

}
exports.imageUpload = async function(data) {
        //listing all files using forEach
        var userId=0;
        var files = data.images;
        var audio = data.audio;
        console.log(files.length)
        files.forEach((file, index) => {
            
            // Ensure that you POST a base64 data to your server.
            // Let's assume the variable "base64" is one.
            const base64File = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            
            // Getting the file type, ie: jpeg, png or gif
            const type = file.split(';')[0].split('/')[1];
            console.log(type)
            
            // Do whatever you want to do with the file

            var param = {
                Bucket: 'combineddatabansi',
                Key: 'User1/'
            };
            
            userId = userId+1;
         
            s3.getObject(param,function(err, data) { 
                if(err){
                    console.log(userId)
                    const params = {
                        Bucket: 'combineddatabansi',
                        Key:`${index + 1}.${type}`,
                        Body: base64File,
                        ACL: 'public-read',
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`,
                    };

                    return new Promise((resolve, reject)=>{
                        s3.putObject(params, (err,results)=>{
                            if(err) reject (err);
                            else {
                                console.log("upload",userId)
                                resolve(results)};
                        });
                    });
                }
                else if (data){
         
                    console.log("upload",userId)
                        const params = {
                        Bucket: 'combineddatabansi',
                        Key:`${index + 1}.${type}`,
                        Body: base64File,
                        ACL: 'public-read',
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`,
                    };

                    return new Promise((resolve, reject)=>{
                        s3.putObject(params, (err,results)=>{
                            if(err) reject (err);
                            else {console.log("upload",index),resolve(results);}
                        });
                    });
                }
                else{
                    console.log("Not found")
                }
        })

    });

    const base64AudioFile = new Buffer.from(audio.replace(/^data:audio\/\w+;base64,/, ""), 'base64');
    const audioFileType = audio.split(';')[0].split('/')[1];
    
    const params = {
        Bucket: 'combineddatabansi',
        Key:`audio.${audioFileType}`,
        Body: base64AudioFile,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `audio/${audioFileType}`,
    };

    return new Promise((resolve, reject)=>{
        s3.putObject(params, (err,results)=>{
            if(err) reject (err);
            else {console.log("upload"),resolve(results);}
        });
    });

};