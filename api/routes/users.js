const uploadToS3 = require('../../uploadToS3')
const fs = require('fs')

exports.register = function (request, response) {
    message = '';
    let data = request.body;
    console.log(data)
    let sqlCommand = "INSERT INTO userdetails (user_name, user_password, user_email) VALUES ('" + data.name + "', '" + data.password + "', '" + data.email + "');";
    console.log(sqlCommand)
    let query = db.query(sqlCommand, function (error, result) {
        console.log(result)
        return response.status(200).json({ result: result })
    });
};

exports.login = function (request, response) {
    let data = request.body
    message = '';
    let sqlCommand = "Select * from userDetails where email = '" + data.email + "' && password = '" + data.password + "';"
    let query = db.query(sqlCommand, function (error, result) {
        request.session.cookie.token = data.email;
        if (result.length == 1) {
            message = "Login Successful!!"
            let resultData = result[0];
            sqlCommand = "Update userState set state = 'online' where userId = " + resultData.userId + ";";
            db.query(sqlCommand)
            return response.status(200).json({ result: message })
        } else {
            message = "Invalid login credentails!!"
            return response.status(404).json({ result: message })
        }

    })
}

exports.create = function (request, response) {
    let data = request.body;
    uploadToS3.imageUpload(data)
}