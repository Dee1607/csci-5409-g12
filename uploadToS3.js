const path = './fiels/'
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const uploadFiles = async () => {

}
const imageUpload = async (files) => {
        //listing all files using forEach
        console.log(files)
        files.forEach(function (file) {
            
            // Ensure that you POST a base64 data to your server.
            // Let's assume the variable "base64" is one.
            const base64File = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            
            // Getting the file type, ie: jpeg, png or gif
            const type = file.split(';')[0].split('/')[1];
            console.log(type)
            
            // Do whatever you want to do with the file
            console.log(file);
            var param = {
                Bucket: 'firstbucketb00858613',
                Key: 'User1/'
            };
            const userId=0;
            userId = userId+1;
            s3.getObject(param,function(err, data) { 
                if(err){
                    console.log("Eroror exists",err)
                    const params = {
                        Bucket: 'firstbucketb00858613',
                        Key:`${userId}.${type}`,
                        Body: base64File,
                        ACL: 'public-read',
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`,
                    };

                    return new Promise((resolve, reject)=>{
                        s3.putObject(params, (err,results)=>{
                            if(err) reject (err);
                            else resolve(results);
                        });
                    });
                }
                else if (data){
                    console.log("Find", data)

                    const params = {
                        Bucket: 'firstbucketb00858613',
                        Key:`${userId}.${type}`,
                        Body: base64File,
                        ACL: 'public-read',
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`,
                    };

                    return new Promise((resolve, reject)=>{
                        s3.putObject(params, (err,results)=>{
                            if(err) reject (err);
                            else resolve(results);
                        });
                    });
                }
                else{
                    console.log("Not found")
                }
        })

    });
 
};
module.exports = imageUpload;