const path = './fiels/'
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const uploadFiles = async () => {

}
exports.imageUpload = async function(files) {
        //listing all files using forEach
        var userId=0;
        files.forEach((file, index) => {
            
            // Ensure that you POST a base64 data to your server.
            // Let's assume the variable "base64" is one.
            const base64File = new Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            
            // Getting the file type, ie: jpeg, png or gif
            const type = file.split(';')[0].split('/')[1];
            console.log(type)
            
            // Do whatever you want to do with the file

            var param = {
                Bucket: 'fb00858613',
                Key: 'User1/'
            };
            
            userId = userId+1;
         
            s3.getObject(param,function(err, data) { 
                if(err){
                    console.log(userId)
                    const params = {
                        Bucket: 'fb00858613',
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
                        Bucket: 'fb00858613',
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
 
};