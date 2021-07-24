const path = './fiels/'
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const uploadFiles = async () => {

}
const upload = async () => {
    fs.readdir(path, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        console.log(files)
        //     files.forEach(function (file) {
        //         // Do whatever you want to do with the file
        //         console.log(file);
        //         var param = {
        //             Bucket: 'firstbucketb00858613',
        //             Key: 'User1/'
        //         };

        //         s3.getObject(param,function(err, data) { 
        //             if(err){
        //                 console.log("Eroror exists",err)
        //                 const params = {
        //                     ACL: 'public-read',
        //                     Body: 'Helllo Wordsl',
        //                     ContentType: 'text/html',
        //                     Bucket: 'firstbucketb00858613',
        //                     Key: 'Userr/'+file
        //                 };

        //                 return new Promise((resolve, reject)=>{
        //                     s3.putObject(params, (err,results)=>{
        //                         if(err) reject (err);
        //                         else resolve(results);
        //                     });
        //                 });
        //             }
        //             else if (data){
        //                 console.log("Find", data)

        //                 const params = {
        //                     ACL: 'public-read',
        //                     Body: 'Helllo Wordsl',
        //                     ContentType: 'text/html',
        //                     Bucket: 'firstbucketb00858613',
        //                     Key: 'User1/'+file
        //                 };

        //                 return new Promise((resolve, reject)=>{
        //                     s3.putObject(params, (err,results)=>{
        //                         if(err) reject (err);
        //                         else resolve(results);
        //                     });
        //                 });
        //             }
        //             else{
        //                 console.log("Not found")
        //             }
        //         })

        // });
    });
};

const main = async (event) => {
    console.log('Event:', event.Records);
    return upload();
};
exports.handler = main;